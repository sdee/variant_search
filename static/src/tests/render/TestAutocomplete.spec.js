import React from 'react';
import { mount } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SearchField from '../../components/Search/SearchField';
import SuggestionsContainer from '../../components/Search/SuggestionsContainer';
import Autosuggest from 'react-autosuggest';

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const mock = new MockAdapter(axios);
const expect = require('expect.js');

const muiTheme = getMuiTheme();

mock.onGet('/api/suggestions/AB').reply(200,
{ results: ['ABAT', 'ABCA12', 'ABCA3', 'ABCB1', 'ABCC1', 'ABCC2', 'ABCC6', 'ABCC9', 'ABCD1', 'ABHD12', 'ABHD5'] });

describe('autocomplete', (t) => {
    it('renders properly', () => {
        const search = mount(
            <SearchField />,
            {
                context: { muiTheme },
                childContextTypes: { muiTheme: React.PropTypes.object },
            },
      );
        expect(search.find(Autosuggest).length).equal(1);
        expect(search.find(SuggestionsContainer).length).equal(1);
    });
});
