class BaseConfig(object):
    DEBUG = True
    VARIANT_FILE_PATH = 'data/variant_results_2000_variants.tsv'


class TestingConfig(object):
    """For unitt ests."""
    TESTING = True
    DEBUG = True
    WTF_CSRF_ENABLED = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    DEBUG_TB_ENABLED = True
    PRESERVE_CONTEXT_ON_EXCEPTION = False
    VARIANT_FILE_PATH = 'data/variant_results_2000_variants.tsv'
