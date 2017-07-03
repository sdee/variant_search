import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';


const getSuggestionValue = suggestion =>  suggestion;

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

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
      isLoading: false
    };

    this.lastRequestId = null;
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
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
    isLoading: true
  });

  this.lastRequestId = setTimeout(() => {
      axios.get('/api/suggestions/'+value)
          .then(({ data })=> {
          	this.setState({suggestions: data.results, isLoading: false})
          })
          .catch((err)=> {})

  }, 1000);
};
  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions, isLoading } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      value,
      onChange: this.onChange
    };

    return (
        <div>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestionsContainer={({ children, ...rest }) => (
                <List {...rest}>
                    {children}
                </List>
        )}
            renderSuggestion={suggestion => (
                <ListItem
                  primaryText={suggestion}
                  leftIcon={<ActionGrade />}
                  style={{ textAlign: 'left' }}
                />
        )}
            inputProps={inputProps}
            renderInputComponent={inputProps => renderInputComponent(inputProps)}
          />
            <RaisedButton label="Search" primary />
        </div>
    );
  }
}

SearchField.propTypes = {

};

export default SearchField;
