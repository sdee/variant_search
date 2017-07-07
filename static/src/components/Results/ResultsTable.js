import React from 'react';
import PropTypes from 'prop-types';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default class ResultsTable extends React.Component {

    render() {

        const style = {
            whiteSpace: 'normal',
            wordWrap: 'break-word',
        };

        const displayCell = (row, column) => row[column].includes('http') ?
            <a
              href={`${row[column]}`}
              target="_blank"
            >
                {row[column]}
            </a> : row[column];

        const columns = this.props.columns;
        const rows = this.props.rows;

        return (
            <div>
                <Table displayBorder >
                    <TableHeader
                      displaySelectAll={false}
                      adjustForCheckbox={false}
                    >
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
                            rows.map((row, rowIndex) => (
                                <TableRow key={`row-${rowIndex}`}>
                                    {
                                    columns.map((column, colIndex) => (

                                        <TableRowColumn
                                          key={`row-${rowIndex}-col-${colIndex}`}
                                          style={style}
                                        >
                                            { displayCell(row, column) }
                                        </TableRowColumn>
                                        ))
                                  }
                                </TableRow>
                              ))
                            }
                    </TableBody>
                </Table>
                <br />
            </div>

        );
    }
}

ResultsTable.propTypes = {
    columns: PropTypes.array.isRequired,
    rows: PropTypes.arrayOf(React.PropTypes.object),
};

ResultsTable.defaultProps = {

};
