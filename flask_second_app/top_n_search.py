from collections import Counter
import time

def top_n_search(n, word_postings):
    start_time = time.time()
    
    # Create a Counter object to count term frequencies across all documents
    term_frequencies = Counter()

    for term, postings in word_postings.items():
        total_frequency = sum(postings.values())
        term_frequencies[term] = total_frequency

    # Find the top N frequent terms
    top_n_terms = term_frequencies.most_common(n)

    # Return the results
    results = [{"term": term, "frequency": frequency} for term, frequency in top_n_terms]
    
    execution_time = time.time() - start_time
    return results, execution_time