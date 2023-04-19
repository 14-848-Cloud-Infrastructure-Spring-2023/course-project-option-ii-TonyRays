#!/usr/bin/env python
import sys
import json
from collections import defaultdict

# Define a nested defaultdict to store word frequencies per filepath
word_postings = defaultdict(lambda: defaultdict(int))

# input comes from standard input (stdin)
for line in sys.stdin:
    # remove leading and trailing whitespace
    line = line.strip()
    # split the line into word and posting
    word, filepath = line.strip().split('\t', 1)
    word_postings[word][filepath] += 1

# Output the final word_postings dictionary as a JSON string
json_word_postings = {k: dict(v) for k, v in word_postings.items()}
print(json.dumps(json_word_postings))
