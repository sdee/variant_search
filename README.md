# Introducting Variant Search #

Variant Search is a tool for searching for genetic variants by gene name. The key feature, auto-suggest, aids the user by offering a list of gene name suggestions based on what has been typed. When submitted, this tool displays a tabular list of variants for the query gene. 

# Setup #

### Run Back-End

```sh
$ pip install -r requirements.txt 
$ python manage.py runserver
* Try: 
  * GET http://localhost:5000/api/suggestions/AB
  * GET http://localhost:5000/api/variants/EYS
```

### Install Front-End 
(dependent on back-end to be running)
```sh
$ cd static
$ npm install
$ npm start
Visit http://localhost:3000/ in browser (default port)
```

### Test Back-End

```sh
$ python tests/allTests.py
```

### Test Front-End 

```sh
cd static
$ npm test
```

Note: coverage of client-side not yet complete

# Data #

By default, the development version of this application runs off a variants file with 2,000 variants. 

The full variants file can be retrieved at [http://clinvitae.invitae.com/download](http://clinvitae.invitae.com/download) and copied over to /data (larger than allowed by Github). 

Then, `VARIANT_FILE_PATH` should be updated in `config.py` either in `BaseConfig` for the web server or `TestingConfig` for the tests.

# Endpoints #

* GET `http://localhost:5000/api/suggestions/<FRAGMENT>` where fragment is the prefix

Sample response:

```json
{"results": ["ABAT", "ABCA12", "ABCA3", "ABCB1", "ABCC1", "ABCC2", "ABCC6", "ABCC9", "ABCD1", "ABHD12", "ABHD5"]}
```

* GET `http://localhost:5000/api/variants/<GENE NAME>`

```json
[{"Inferred Classification": "Pathogenic", "Nucleotide Change": "", "Source": "ClinVar", "Chr": null, "Ref": null, "Reported Ref": null, "Protein Change": "", "Assembly": null, "Reported Alt": null, "Genomic Start": null, "Genomic Stop": null, "Other Mappings": "", "Submitter Comment": "", "URL": "https://www.ncbi.nlm.nih.gov/clinvar/RCV000000569", "Last Updated": "2017-04-25", "Region": "", "Reported Classification": "Pathogenic", "Alias": "", "Transcripts": "", "Gene": "EYS", "Last Evaluated": "2008-11-01", "Accession": null, "Alt": null} ...]
```

This endpoint provides all of the columns in the variants file as attributes for extensibility purposes. The client currently only displays a select few.

# Stack Overview #

* [MARISA](https://github.com/pytries/marisa-trie)-trie for storing gene names and efficiently searching by prefix
* [Flask](http://flask.pocoo.org/) for API endpoints (unittest and Flask's test_client for testing)
* [React](https://facebook.github.io/react/) and [ReactRouter](https://github.com/ReactTraining/react-router) for Front-end
* [Axios](https://github.com/mzabriskie/axios) for async calls to API 
* [Material UI](http://www.material-ui.com/#/) for React UI components including Table and Buttons (based on Google's Material Design)
* [React-autosuggest](https://github.com/moroshko/react-autosuggest)-a highly configurable, well-tested Autosuggest component to build on top of
* Client-side Testing:
  * [Mocha](https://mochajs.org/) for defining tests
  * [Expect](https://github.com/mjackson/expect) for assertions
  * [Enzyme](https://github.com/airbnb/enzyme) for rendering
  * [Karma Runner](http://karma-runner.github.io/) for running all of the tests
  * [Axios Mock Adapter](https://github.com/ctimmerm/axios-mock-adapter) for mocking endpoints
* [Webpack](https://webpack.github.io/) for bundling and [npm](https://www.npmjs.com/) for dependencies
* [React-Redux-Flask](https://github.com/dternyak/React-Redux-Flask) boilerplate
* Variants data from [http://clinvitae.invitae.com/download](http://clinvitae.invitae.com/download)

# In Action #

![Demo](/variant_search_demo.gif "Demo")

(Based on running smaller, development version of variants file)
