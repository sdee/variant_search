import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResultsTable extends React.Component {
  constructor() {
    super();
    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.

    this.state = {
      gene: '',
      variants: []
    };

  }

  render() {
    const { gene, variants } = this.state;
     const { geneName } = this.props.geneName;
    return (

      <div>
        <h1>gene</h1>
        <h1>{geneName}</h1>
      </div>
    );

  }
}
ResultsTable.propTypes = {
params: PropTypes.array.isRequired,
};

export default ResultsTable;
