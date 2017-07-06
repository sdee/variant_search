# Introducting Variant Search #

Variant Search is a tool for searching for genetic variants using gene name. The key feature, auto-suggest, aids the user by offering a list of gene name suggestions based on what has been typed. When submitted, this tool displays a tabular list of variants for the query gene. 

# Quickstart #

### Run Back-End

```sh
$ pip install -r requirements.txt 
$ python manage.py runserver
* Try: 
  * http://localhost:5000/api/suggestions/AB
  * http://localhost:5000/api/variants/EYS
```

### Install Front-End
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
$ npm test
```

Note: coverage of client-side not yet complete

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
  * [Karma Runner](http://karma-runner.github.io/) for running tests
  * [Axios Mock Adapter](https://github.com/ctimmerm/axios-mock-adapter) for mocking endpoints
* [Webpack](https://webpack.github.io/) for bundling and [npm](https://www.npmjs.com/) for dependencies
* [React-Redux-Flask](https://github.com/dternyak/React-Redux-Flask) boilerplate
* Variants data from [http://clinvitae.invitae.com/download](http://clinvitae.invitae.com/download)
