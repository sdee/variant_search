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
    locked: true,
    width: 80
  },
  {
    key: 'Nucleotide Change',
    name: 'Nucleotide Change',
    width: 350,
    resizable: true
  },
  {
    key: 'Protein Change',
    name: 'Protein Change',
    width: 110,
  },
  {
    key: 'Alias',
    name: 'Alias',
    width: 80,
  },
  {
    key: 'Region',
    name: 'Region',
    width: 100
  },
  {
    key: 'Reported Classification',
    name: 'Reported Classification',
    width: 200
  },
  {
    key: 'Last Evaluated',
    name: 'Last Evaluated',
    width: 130
  },
  {
    key: 'Last Updated',
    name: 'Last Updated',
    width: 130
  },
  {
    key: 'URL',
    name: 'More info',
    width: 200
  }
];

    return (
      <div>
        <h1>{`Variants for ${this.state.geneName}`}</h1>
        <br/>
        <ReactDataGrid
      enableCellSelect={true}
      columns={columns}
      rowGetter={this.getRows}
      rowsCount={this.state.variants.length}
      minWidth={1400}
      minHeight={300}
      />
      </div>
    );
  }
}
