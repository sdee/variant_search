import os
import json
import unicodecsv
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
        lines = unicodecsv.DictReader(f, delimiter='\t')
        for line in lines:
            gene = line['Gene']
            genes.add(gene)
            variants_by_gene[gene].append(line)
    g.gene_name_trie = _build_trie(genes)


def _build_trie(gene_names):
    return marisa_trie.Trie(gene_names)


def get_suggestions(query, strict_casing=False):
    def has_lowercase(query):
        return any(filter(str.islower, str(query)))
    suggestions = g.gene_name_trie.keys(unicode(query))
    if not strict_casing and not suggestions and has_lowercase(query):
        suggestions = g.gene_name_trie.keys(unicode(str(query).upper()))
    return suggestions


@app.route('/api/suggestions/<fragment>', methods=['GET'])
def index(fragment=None):
    suggestions = get_suggestions(fragment) if fragment else []
    return json.dumps(dict(results=[str(s) for s in suggestions]))
