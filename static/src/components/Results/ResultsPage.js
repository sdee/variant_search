import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router';
import ResultsTable from './ResultsTable';

export default class ResultsPage extends React.Component {

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

        const variants = this.state.variants;
        return (
            <div>
                <h1>{`Variants for ${this.state.geneName}`}</h1>
                <Paper style={{ padding: '10px' }}>
                    {variants.length > 0 ? (
                        <ResultsTable rows={variants} columns={columns} />
                     ) : (
                         <h3>No results found.</h3>
                     )}


                </Paper>
                <br />
                <Link to="/search">Back to Search</Link>
            </div>

        );
    }
}

ResultsPage.propTypes = {
    params: PropTypes.shape({
        geneName: PropTypes.string,
    }),
};

ResultsPage.defaultProps = {

};
