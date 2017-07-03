import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResultsTable extends React.Component {
  constructor() {
    super();
    this.state = {
      gene: '',
      variants: []
    };

  }

  render() {
    const { gene, variants } = this.state;
    const { geneName } = this.props;
    console.log(geneName);
    return (

      <div>
        Gene
        <h1>gene</h1>
        <h1>{geneName}</h1>
      </div>
    );

  }
}
ResultsTable.propTypes = {
geneName: PropTypes.string.isRequired,
};

export default ResultsTable;
