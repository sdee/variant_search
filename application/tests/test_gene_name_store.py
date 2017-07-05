import unittest
from application.app import GeneNameStore
from testing_config import BaseTestConfig

class TestAPI(BaseTestConfig):


    def test_trie(self):
        gs = GeneNameStore(['ABAT', 'ABCA1', 'ABCA10', 'ABCA13', 'AAR2', 'QRFPR'])
        self.assertEqual(gs.get_suggestions('A'),
                         [u'AAR2', u'ABAT', u'ABCA1', u'ABCA10', u'ABCA13'])
        self.assertEqual(gs.get_suggestions('AB'),
                         [u'ABAT', u'ABCA1', u'ABCA10', u'ABCA13'])
        self.assertEqual(gs.get_suggestions('ABC'),
                         [u'ABCA1', u'ABCA10', u'ABCA13'])
        gs = GeneNameStore(['ABAT', 'ABCA1', 'ABCA1'])  # duplicate key
        self.assertEqual(gs.get_suggestions('AB'), [u'ABAT', u'ABCA1'])


if __name__ == '__main__':
    unittest.main()
