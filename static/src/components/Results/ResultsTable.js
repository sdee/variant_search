import React from "react";
import axios from 'axios';
const ReactDataGrid = require('react-data-grid');
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default class ResultsTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            geneName: this.props.params.geneName,
            variants: [],
        };
    }

    componentDidMount() {
        axios.get(`/api/variants/${this.state.geneName}`)
        .then(({ data }) => {
            this.setState({ variants: data });
        });
    }

    render() {

        const columns = ['Gene',
            'Nucleotide Change',
            'Protein Change',
            'Alias',
            'Region',
            'Reported Classification',
            'Last Evaluated',
            'Last Updated',
            'URL'];

        const variants = this.state.variants;

        return (
            <div>
                <h1>{`Variants for ${this.state.geneName}`}</h1>
                  <Table displayBorder={true} >
         <TableHeader  displaySelectAll={false} adjustForCheckbox={false}>
           <TableRow >
             {
               columns.map((col, i) => <TableHeaderColumn key={i}>{col}</TableHeaderColumn>)
             }
           </TableRow>
         </TableHeader>
         <TableBody displayRowCheckbox={false}>

             {
              variants.map(function(row, rowIndex) {
                return (
                  <TableRow key={'row-'+rowIndex}>
                    {
                      columns.map(function(column, colIndex) {
                        return (
                          <TableRowColumn key={'row-'+rowIndex+'-col-'+colIndex} style={{
  whiteSpace: 'normal',
  wordWrap: 'break-word'
}}>
                            {row[column]}
                          </TableRowColumn>
                        )
                      })
                    }
                  </TableRow>
                )
              })
            }
           }
         </TableBody>
       </Table>

            </div>
        );
    }
}
