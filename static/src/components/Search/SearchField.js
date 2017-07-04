import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import axios from 'axios';

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

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue,
        });
    };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.loadSuggestions(value);
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

  // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
            noSuggestionsAvailable: false,
        });
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
                      <List {...rest}>
                          {children}
                      </List>
        )}
                  renderSuggestion={suggestion => (
                      <div>
                          <ListItem
                            primaryText={suggestion}
                            style={{ textAlign: 'left' }}
                            hoverColor={'#dddddd'}
                          />
                          <Divider />
                      </div>
        )}
                  inputProps={inputProps}
                  renderInputComponent={inputProps => renderInputComponent(inputProps)}
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
            </div>
        );
    }
}

SearchField.propTypes = {

};

export default SearchField;
