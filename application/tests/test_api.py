import unittest, StringIO, os, requests, json
from testing_config import BaseTestConfig

# integration test for Annotate endpoint
class TestAPI(BaseTestConfig):


    def test_suggestions_endpoint(self):
        resp = self.app.get('/api/suggestions/AB')
        self.assertEqual(resp.status_code, 200)
        data = json.loads(resp.data.decode("utf-8"))['results']
        self.assertEqual(data, [u'ABCA12', u'ABCA3', u'ABCC1', u'ABCC2', u'ABCC6', u'ABCC9', u'ABHD12', u'ABHD5'])

        resp = self.app.get('/api/suggestions/ab') #expect same results with lowercase
        self.assertEqual(resp.status_code, 200)
        data = json.loads(resp.data.decode("utf-8"))['results']
        self.assertEqual(data, [u'ABCA12', u'ABCA3', u'ABCC1', u'ABCC2', u'ABCC6', u'ABCC9', u'ABHD12', u'ABHD5'])

        # no matches
        resp = self.app.get('/api/suggestions/ABX')
        self.assertEqual(resp.status_code, 200)
        data = json.loads(resp.data.decode("utf-8"))['results']
        self.assertEqual(data, [])

        # missing query
        resp = self.app.get('/api/suggestions/')
        self.assertEqual(resp.status_code, 404)


    def test_variants_endpoint(self):
        resp = self.app.get('/api/variants/EYS')
        self.assertEqual(resp.status_code, 200)
        data = json.loads(resp.data.decode("utf-8"))
        self.assertEqual(len(data), 3)  # number of variants
        self.assertEqual(len(data[0]), 23)  # number of attributes for a variant

        # missing query
        resp = self.app.get('/api/variants/')
        self.assertEqual(resp.status_code, 404)


if __name__ == '__main__':
    unittest.main()
