from flask import Flask, request, jsonify
from term_search import term_search
from top_n_search import top_n_search
from flask_cors import CORS
import shutil
import os
import zipfile
import subprocess
from werkzeug.utils import secure_filename
import json

UPLOAD_FOLDER = './uploaded_files'
ALLOWED_EXTENSIONS = {'zip'}

def extract_files(zip_file, destination):
    with zipfile.ZipFile(zip_file, 'r') as z:
        z.extractall(destination)
        
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# def load_inverted_index(json_file):
#     with open(json_file, 'r') as f:
#         inverted_index = json.load(f)
#     return inverted_index

def load_inverted_index(json_file):
    with open(json_file, 'r') as f:
        # Read the file line by line and decode each line as JSON
        data = [json.loads(line) for line in f]

        # Merge the JSON objects from each line into a single dictionary
        inverted_index = {}
        for item in data:
            inverted_index.update(item)

    return inverted_index

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

@app.route('/term_search', methods=['GET'])
def api_term_search():
    term = request.args.get('term', None)
    # Load the inverted index from the JSON file
    word_postings = load_inverted_index('inverted_index.json')
    if term:
        results_temp = term_search(term, word_postings)
        results = {"results": results_temp}
        return jsonify(results)
    else:
        return jsonify({"error": "No term provided."})

@app.route('/top_n_search', methods=['GET'])
def api_top_n_search():
    n = request.args.get('n', None)
    # Load the inverted index from the JSON file
    word_postings = load_inverted_index('inverted_index.json')
    if n:
        try:
            n = int(n)
            results_temp = top_n_search(n, word_postings)
            results = {"results": results_temp}
            return jsonify(results)
        except ValueError:
            return jsonify({"error": "Invalid value for N."})
    else:
        return jsonify({"error": "No value for N provided."})

@app.route('/upload', methods=['POST'])
def upload_folder():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request."})
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected for uploading."})
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        # Extract files from the uploaded ZIP file
        extract_path = os.path.join(app.config['UPLOAD_FOLDER'], 'extracted')
        os.makedirs(extract_path, exist_ok=True)
        extract_files(file_path, extract_path)
        
        # Move the extracted files to HDFS
        hdfs_input_dir = '/haichuan0304/input'
        subprocess.run(['hdfs', 'dfs', '-mkdir', '-p', hdfs_input_dir], check=True)
        subprocess.run(['hdfs', 'dfs', '-put', '-f', extract_path + '/*', hdfs_input_dir], check=True)
        
        # Run the Hadoop streaming job
        hadoop_streaming_jar = '/usr/lib/hadoop/hadoop-streaming.jar'
        output_hdfs_dir = '/haichuan0304/output'
        subprocess.run(['hadoop', 'jar', hadoop_streaming_jar, '-file', 'mapper.py', '-mapper', 'python mapper.py',
                        '-file', 'reducer.py', '-reducer', 'python reducer.py', '-input', hdfs_input_dir,
                        '-output', output_hdfs_dir], check=True)
        
        # Copy the output from HDFS to local filesystem
        local_output_file = os.path.join(app.config['UPLOAD_FOLDER'], 'inverted_index.json')
        subprocess.run(['hdfs', 'dfs', '-getmerge', output_hdfs_dir, local_output_file], check=True)
        
        # Remove the temporary directories
        shutil.rmtree(extract_path)
        subprocess.run(['hdfs', 'dfs', '-rm', '-r', hdfs_input_dir], check=True)
        subprocess.run(['hdfs', 'dfs', '-rm', '-r', output_hdfs_dir], check=True)
        
        return jsonify({"message": "Folder uploaded and processed successfully."})
    else:
        return jsonify({"error": "Allowed file types are ZIP only."})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')