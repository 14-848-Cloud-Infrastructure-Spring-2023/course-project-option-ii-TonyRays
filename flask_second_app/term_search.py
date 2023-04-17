
def term_search(term, word_postings):
    # Search for the term in the inverted index and return the results
    postings = word_postings.get(term, {})
    # results = [{"filepath": filepath, "frequency": frequency} for filepath, frequency in postings.items()]
    results = [{"id": idx, "filepath": filepath, "frequency": frequency} for idx, (filepath, frequency) in enumerate(postings.items(), 1)]
    return results