import React from 'react';
import TextField from 'material-ui/TextField';
import { mount } from 'enzyme';
import List, {ListItem} from 'material-ui/List';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SearchField from '../../components/Search/SearchField';
import SuggestionsContainer from '../../components/Search/SuggestionsContainer';
import SuggestionItem from '../../components/Search/SuggestionItem';
import Autosuggest from 'react-autosuggest';
import ReactTestUtils from 'react-dom/test-utils';

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const mock = new MockAdapter(axios);
const expect = require('expect.js');

const muiTheme = getMuiTheme();

//TODO: Simulate typing in text field and count suggestionItem

mock.onGet('/api/suggestions/AB').reply(200,
{ results: ['ABAT', 'ABCA12', 'ABCA3', 'ABCB1', 'ABCC1', 'ABCC2', 'ABCC6', 'ABCC9', 'ABCD1', 'ABHD12', 'ABHD5'] });

describe('autocomplete', (t) => {
    it('handles typing', () => {
        const search = mount(
            <SearchField />,
            {
                context: { muiTheme },
                childContextTypes: { muiTheme: React.PropTypes.object },
            },
      );
        const textField = search.find(Autosuggest).find('input');
        search.find(Autosuggest).simulate('change', { target: { value: 'AB' } });
        console.log(search.find(Autosuggest).debug());
        console.log(search.state);
        console.log(search.find(Autosuggest).state);
        expect(search.find(Autosuggest).length).equal(1);
        const suggestionsContainer = search.find(Autosuggest).find(SuggestionsContainer);
        console.log("container");
        console.log(suggestionsContainer.debug());
        console.log("items");
        //expect(search.find(Autosuggest).find(SuggestionItem).length).equal(11);
        //expect(search.find(Autosuggest).find(SuggestionItem).length).equal(11);
        console.log(suggestionsContainer.find(List).debug());
        console.log(suggestionsContainer.find(List).find(ListItem).debug())

    });
});
