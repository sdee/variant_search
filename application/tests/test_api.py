import unittest, StringIO, os, requests
from testing_config import BaseTestConfig

#integration test for Annotate endpoint
class TestApi(BaseTestConfig):

    def test_suggestions(self):
        resp = self.app.get('http://localhost/api/suggestions/AB')
        print resp
        
if __name__ == '__main__':
    unittest.main()
