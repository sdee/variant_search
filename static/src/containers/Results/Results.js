import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ResultsTable from '../../components/Results/ResultsTable';

const mapStateToProps = (state, { params }) => ({
    geneName: params.geneName,
});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResultsTable));
