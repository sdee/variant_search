import React from 'react';
import { mount } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SearchField from '../../components/Search/SearchField';
import SuggestionsContainer from '../../components/Search/SuggestionsContainer';
import SuggestionItem from '../../components/Search/SuggestionItem';
import Autosuggest from 'react-autosuggest';

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const mock = new MockAdapter(axios);
const expect = require('expect.js');

const muiTheme = getMuiTheme();

/*
TODO: Simulate typing in text field and count suggestionItem.
Test case: 'A' -> should have no SuggestionItem because of minimum
Test case: 'AB' -> should have two SuggestionItem
Test case: 'ABC' -> should have one SuggestionItem
Test case: 'ABQ' -> should have zero SuggestionItem but a 'Not Found' div
*/

mock.onGet('/api/suggestions/A').reply(200,
{ results: ['AAAS', 'ABAT', 'ABCB1', 'ADA'] });
mock.onGet('/api/suggestions/AB').reply(200,
{ results: ['ABAT', 'ABCB1'] });
mock.onGet('/api/suggestions/ABC').reply(200,
{ results: ['ABCB1'] });

describe('autocomplete', (t) => {
    it('gives suggestions', () => {
        const search = mount(
            <SearchField />,
            {
                context: { muiTheme },
                childContextTypes: { muiTheme: React.PropTypes.object },
            },
      );
        const textField = search.find(Autosuggest).find('input');
        search.find(Autosuggest).simulate('change', { target: { value: 'AB' } });
        // console.log(search.find(Autosuggest).debug());
        // console.log(search.state);
        // console.log(search.find(Autosuggest).state);
        expect(search.find(Autosuggest).length).equal(1);
        const suggestionsContainer = search.find(Autosuggest).find(SuggestionsContainer);
        // console.log("container");
        // console.log(suggestionsContainer.debug());
        // console.log("items");
        //expect(search.find(Autosuggest).find(SuggestionItem).length).equal(11);
        //expect(search.find(Autosuggest).find(SuggestionItem).length).equal(11);
        // console.log(suggestionsContainer.find(List).debug());
        // console.log(suggestionsContainer.find(List).find(ListItem).debug())
    });
});
