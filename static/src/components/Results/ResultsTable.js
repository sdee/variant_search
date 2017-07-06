import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

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
        const columns = [
            'Gene',
            'Nucleotide Change',
            'Protein Change',
            'Alias',
            'Region',
            'Reported Classification',
            'Last Evaluated',
            'Last Updated',
            'URL',
        ];
        const style = {
            whiteSpace: 'normal',
            wordWrap: 'break-word',
        };

        const variants = this.state.variants;

        return (
            <div>
                <h1>{`Variants for ${this.state.geneName}`}</h1>
                <Table displayBorder >
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow >
                            {
                              columns.map((col, i) =>
                                  <TableHeaderColumn
                                    key={i}
                                    style={style}
                                  >
                                      <b>{col}</b>
                                  </TableHeaderColumn>)
                            }
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} stripedRows>
                        {
                        variants.map((row, rowIndex) => (
                            <TableRow key={`row-${rowIndex}`}>
                                {
                                columns.map((column, colIndex) => (
                                    <TableRowColumn
                                      key={`row-${rowIndex}-col-${colIndex}`}
                                      style={style}
                                    >
                                        {row[column]}
                                    </TableRowColumn>
                                    ))
                              }
                            </TableRow>
                          ))
                        }
                    </TableBody>
                </Table>
            </div>
        );
    }
}

ResultsTable.propTypes = {
    params: PropTypes.shape({
        geneName: PropTypes.string,
    }),
};

ResultsTable.defaultProps = {

};
