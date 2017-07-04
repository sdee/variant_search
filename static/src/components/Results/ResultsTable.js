import React from "react";
import axios from 'axios';
const ReactDataGrid = require('react-data-grid');

export default class ResultsTable extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        geneName: this.props.params.geneName,
        variants: [],

      };
    }

    getRows = (i) => {
      return this.state.variants[i];
    };

  componentDidMount() {
    console.log("mount");
    console.log(this.props.params.geneName);
    console.log(`/api/gene/${this.props.params.geneName}`)
     axios.get(`/api/variants/${this.props.params.geneName}`)
       .then(({ data }) => {
         console.log(data);
        this.setState({ variants: data });
       });
   }

  render() {
    const { query } = this.props.location;
    const { params } = this.props;
    const {geneName} = params;

    let columns = [
  {
    key: 'Gene',
    name: 'Gene',
    locked: true
  },
  {
    key: 'Nucleotide Change',
    name: 'Nucleotide Change'
  }
];

    return (
      <div>
        <h1>{`Variants for ${this.state.geneName}`}</h1>
        <ReactDataGrid
      enableCellSelect={true}
      columns={columns}
      rowGetter={this.getRows}
      rowsCount={this.state.variants.length}

      minHeight={500}
      />
      </div>
    );
  }
}
