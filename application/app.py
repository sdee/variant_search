import json
import os
import unicodecsv
from collections import defaultdict
from flask import g, abort
import marisa_trie
from index import app
from basedir import basedir

VARIANT_FILE_PATH = app.config['VARIANT_FILE_PATH']


class GeneNameStore:

    def __init__(self, gene_names):
        self.trie = marisa_trie.Trie(gene_names)

    def get_suggestions(self, query, strict_casing=False):
        def has_lowercase(query):
            return any(filter(str.islower, str(query)))
        suggestions = self.trie.keys(query)
        if not strict_casing and not suggestions and has_lowercase(query):
            suggestions = self.trie.keys(unicode(str(query).upper()))
        suggestions.sort()  # sort to ensure consistent results every time
        return suggestions

'''
Important Note: the "global" g object provided by flask is created before a
requestis started and flushed at the end of the request. A long-term solution
for initializing the data is using a cache like werkzeug's SimpleCache or Redis.
With a cache, we could potentially use before_first_request instead.
'''
@app.before_request
def initialize_search_data():
    genes = set()
    variants_by_gene = defaultdict(list)
    with open(os.path.join(basedir, VARIANT_FILE_PATH)) as f:
        lines = unicodecsv.DictReader(f, delimiter='\t', encoding='utf-8')
        for line in lines:
            gene = line['Gene']
            genes.add(gene)
            variants_by_gene[gene].append(line)
    g.gene_name_store = GeneNameStore(genes)
    g.variants_by_gene = variants_by_gene


@app.route('/api/suggestions/<fragment>', methods=['GET'])
def suggestions_endpoint(fragment=None):
    suggestions = g.gene_name_store.get_suggestions(fragment) if fragment else []
    return json.dumps(dict(results=[str(s) for s in suggestions]))


@app.route('/api/variants/<gene_name>', methods=['GET'])
def variants_endpoint(gene_name=None):
    if gene_name in g.variants_by_gene:
        variants = g.variants_by_gene[gene_name]
        #Note: does not guarantee deterministic sort order, this field is sometimes missing and may not be unique
        variants.sort(key=lambda v: v['Nucleotide Change'])
        return json.dumps(variants)
    else:
        abort(404)  # resource not found
