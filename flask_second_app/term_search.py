import time

def term_search(term, word_postings):
    start_time = time.time()
    
    # Search for the term in the inverted index and return the results
    postings = word_postings.get(term, {})
    # results = [{"filepath": filepath, "frequency": frequency} for filepath, frequency in postings.items()]
    results = [{"id": idx, "filepath": filepath, "frequency": frequency} for idx, (filepath, frequency) in enumerate(postings.items(), 1)]
    
    execution_time = time.time() - start_time
    return results, execution_time