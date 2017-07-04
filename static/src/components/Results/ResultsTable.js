import React from "react";
import axios from 'axios';

export default class ResultsTable extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        geneName: '',
        variants: []
      };
    }

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
    name: 'id',
    locked: true
  },
  {
    key: 'Nucleotide Change',
    name: 'Nucleotide Change'
  }
];

    return (
      <div>
        <h1>Test</h1>
        {geneName}
      </div>
    );
  }
}
