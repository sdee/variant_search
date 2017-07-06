import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router';
import List, { ListItem } from 'material-ui/List';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import axios from 'axios';
import SuggestionItem from './SuggestionItem';
import SuggestionsContainer from './SuggestionsContainer';
import { debounce } from 'underscore';
import Paper from 'material-ui/Paper';

const getSuggestionValue = suggestion => suggestion;

const shouldRenderSuggestions = value => value.trim().length >= 2;

const renderInputComponent = inputProps => (
    <TextField
      hintText="Type a gene name"
      style={{
          width: '100%',
          fontSize: '16px',
      }}
      {...inputProps}
    />
);

class SearchField extends React.Component {
    constructor() {
        super();

        this.state = {
            value: '',
            suggestions: [],
            isLoading: false,
        };
        this.lastRequestId = null;
    }

    componentDidMount() {
      this.input.focus();
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue,
        });
    };

    onEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.context.router.push(`/gene/${this.state.value}`);
        }
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.debouncedLoadSuggestions(value);
    };

    loadSuggestions = (value) => {
        if (this.lastRequestId !== null) {
            clearTimeout(this.lastRequestId);
        }
        this.setState({
            isLoading: true,
        });
        this.lastRequestId = setTimeout(() => {
            axios.get(`/api/suggestions/${value}`)
          .then(({ data }) => {
              if (data.results.length > 0) {
                  this.setState({
                      suggestions: data.results,
                      isLoading: false,
                      noSuggestionsAvailable: false,
                  });
              } else {
                  const isInputBlank = value.trim() === '';
                  this.setState({
                      noSuggestionsAvailable: !isInputBlank,
                      isLoading: false,
                      suggestions: [] });
              }

          })
          .catch((err) => { console.log(err); });
        }, 1000);
    };

    debouncedLoadSuggestions = value => debounce(this.loadSuggestions(value), 200);

  // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
            noSuggestionsAvailable: false,
        });
    };

    storeInputReference = (autosuggest) => {
        if (autosuggest !== null) {
            this.input = autosuggest.input;
        }
    };

    clearInput = () => {
        this.setState({ value: '' });
    };
    render() {
        const { value, suggestions, isLoading, noSuggestionsAvailable } = this.state;
    // Autosuggest will pass through all these props to the input.
        const inputProps = {
            value,
            onChange: this.onChange,
            onKeyDown: this.onEnter,
        };

        return (
            <div>
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                  getSuggestionValue={getSuggestionValue}
                  shouldRenderSuggestions={shouldRenderSuggestions}
                  renderSuggestionsContainer={({ children, ...rest }) => (
                      <SuggestionsContainer rest={rest}>
                          {children}
                      </SuggestionsContainer>
                  )}
                  renderSuggestion={suggestion => (
                      <div>
                          <SuggestionItem suggestion={suggestion} />
                          <Divider />
                      </div>
                  )}
                  inputProps={inputProps}
                  renderInputComponent={inputProps => renderInputComponent(inputProps)}
                  ref={this.storeInputReference}
                />
                {
                  noSuggestionsAvailable &&
                  <div className="no-suggestions">
                      <ListItem
                        primaryText={'No Matches'}
                        style={{ textAlign: 'left' }}
                      />
                  </div>
                }

                <RaisedButton
                  label="Search" primary
                  style={{ margin: '5px' }}
                  containerElement={<Link to={`/gene/${this.state.value}`} />}
                  linkButton
                />

                <RaisedButton
                  label="Clear"
                  onClick={this.clearInput}
                  style={{ margin: '5px' }}
                />
                <br />
                <br />
                <Paper zDepth={0} style={{ padding: '5px' }}>
                    <div>
                        <b>Sample Searches: </b>
                        <Link to={'/gene/CYP11B1'} style={{ marginLeft: '5px' }}>CYP11B1</Link>
                        <Link to={'/gene/EYS'} style={{ marginLeft: '5px' }}>EYS</Link>
                        <Link to={'/gene/PROC'} style={{ marginLeft: '5px' }}>PROC</Link>
                    </div>
                </Paper>
            </div>
        );
    }
}

SearchField.propTypes = {

};

SearchField.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

export default SearchField;
