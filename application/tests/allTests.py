import unittest
from application.tests.test_gene_name_store import TestGeneStore
from application.tests.test_api import TestAPI


def suite():
    """
        Gather all the tests from this module in a test suite.
    """
    test_suite = unittest.TestSuite()
    test_suite.addTest(unittest.makeSuite(TestGeneStore))
    test_suite.addTest(unittest.makeSuite(TestAPI))
    return test_suite


VTestSuite = suite()


runner = unittest.TextTestRunner()
runner.run(VTestSuite)
