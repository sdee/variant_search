import os
import json
import csv
from collections import defaultdict
from flask import request, g
import marisa_trie
from index import app, db
from sets import Set

@app.before_request
def initialize_search_data():
    genes = Set()
    variants_by_gene = defaultdict(list)
    with open('./application/tests/variants_slice.tsv') as f:
        lines = csv.DictReader(f, delimiter='\t')
        for line in lines:
            gene = line['Gene']
            genes.add(gene)
            variants_by_gene[gene].append(line)
    gene_names = map(unicode, genes)
    g.gene_name_trie = _build_trie(gene_names)


def _build_trie(gene_names):
    return marisa_trie.Trie(gene_names)


def get_suggestions(query):
    return g.gene_name_trie.keys(unicode(query))


@app.route('/api/suggestions/<fragment>', methods=['GET'])
def index(fragment=None):
    suggestions = get_suggestions(fragment) if fragment else []
    return json.dumps(dict(results=[str(s) for s in suggestions]))
