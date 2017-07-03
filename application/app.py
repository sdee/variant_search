from flask import request, render_template, jsonify, url_for, redirect, g
import marisa_trie
from index import app, db
import os
import json
from sets import Set

# gene_names = [u'mdm2', u'mdm3', u'prnt2', u'alpha2']

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

@app.route('/api/suggestions/', methods=['GET'])
def index():
    suggestions = get_suggestions('CA')
    return json.dumps(dict(results=suggestions))
