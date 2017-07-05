import unittest,json
from testing_config import BaseTestConfig

# integration test for Annotate endpoint
class TestAPI(BaseTestConfig):


    def test_suggestions_endpoint(self):
        resp = self.app.get('/api/suggestions/MA')
        self.assertEqual(resp.status_code, 200)
        data = json.loads(resp.data.decode("utf-8"))['results']
        self.assertEqual(data, [u'MAPK10', u'MARVELD2', u'MAT1A'])

        resp = self.app.get('/api/suggestions/ma') #expect same results with lowercase
        self.assertEqual(resp.status_code, 200)
        data = json.loads(resp.data.decode("utf-8"))['results']
        self.assertEqual(data, [u'MAPK10', u'MARVELD2', u'MAT1A'])

        # no matches
        resp = self.app.get('/api/suggestions/MAQ')
        self.assertEqual(resp.status_code, 200)
        data = json.loads(resp.data.decode("utf-8"))['results']
        self.assertEqual(data, [])

        # missing query
        resp = self.app.get('/api/suggestions/')
        self.assertEqual(resp.status_code, 404)


    def test_variants_endpoint(self):
        resp = self.app.get('/api/variants/MAT1A')
        self.assertEqual(resp.status_code, 200)
        data = json.loads(resp.data.decode("utf-8"))
        self.assertEqual(len(data), 3)  # number of variants
        self.assertEqual(len(data[0]), 23)  # number of attributes for a variant

        # missing query
        resp = self.app.get('/api/variants/')
        self.assertEqual(resp.status_code, 404)


if __name__ == '__main__':
    unittest.main()
