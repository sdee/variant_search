import json
import unicodecsv
from collections import defaultdict
from flask import g, abort
import marisa_trie
from index import app, db
from sets import Set


class GeneNameStore:

    def __init__(self, gene_names):
        self.trie = marisa_trie.Trie(gene_names)

    def get_suggestions(self, query, strict_casing=False):
        def has_lowercase(query):
            return any(filter(str.islower, str(query)))
        suggestions = self.trie.keys(unicode(query))
        if not strict_casing and not suggestions and has_lowercase(query):
            suggestions = self.trie.keys(unicode(str(query).upper()))
        suggestions.sort()  # sort to ensure consistent results every time
        return suggestions


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
    g.gene_name_store = GeneNameStore(genes)
    g.variants_by_gene = variants_by_gene


@app.route('/api/suggestions/<fragment>', methods=['GET'])
def suggestions_endpoint(fragment=None):
    suggestions = g.gene_name_store.get_suggestions(fragment) if fragment else []
    return json.dumps(dict(results=[str(s) for s in suggestions]))


@app.route('/api/variants/<genename>', methods=['GET'])
def variants_endpoint(genename=None):
    if genename in g.variants_by_gene:
        variants = g.variants_by_gene[genename]
        variants.sort()
        return json.dumps()
    else:
        abort(404)  # resource not found
