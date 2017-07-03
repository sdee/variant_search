from flask import request, render_template, jsonify, url_for, redirect, g
import marisa_trie
from index import app, db
import os
import json
from sets import Set


cwd = os.getcwd()
print cwd
with open('./application/tests/variants_medium.tsv') as f:
    genes = Set()
    lines = f.readlines()
    for line in lines:
        gene = line.split('\t')[0]
        genes.add(gene)
gene_names = map(unicode, genes)


def get_suggestions(query):
    trie = marisa_trie.Trie(gene_names)
    return trie.keys(unicode(query))


@app.route('/api/suggestions/<fragment>', methods=['GET'])
def index(fragment=None):
    suggestions = get_suggestions(fragment) if fragment else []
    return json.dumps(dict(results=[str(s) for s in suggestions]))
