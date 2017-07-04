import React from "react";

export default class ResultsTable extends React.Component {
  render() {
    const { query } = this.props.location;
    const { params } = this.props;
    const {geneName} = params;
    console.log(this.props);
    console.log(geneName);
    return (
      <div>
        <h1>Test</h1>
        {geneName}
      </div>
    );
  }
}
