import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import RaisedButton from 'material-ui/RaisedButton';

// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'Elm',
    year: 2012
  }
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  // change!!
  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue,
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestionsContainer = ({ containerProps, children, query }) => {
  const { ref, ...restContainerProps } = containerProps;
  const callRef = list=> {
    if (list !== null) {
      ref(list.component);
    }
  };
  return (
    <List ref={callRef} {...restContainerProps}>
      {children}
    </List>
  );
}

const renderSuggestion = suggestion => (
  <ListItem>
    <ListItemText primary={suggestion.name} />
  </ListItem>
);

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
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

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
              primaryText={suggestion.name}
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
