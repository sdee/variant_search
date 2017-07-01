import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
   
}

@connect(mapStateToProps, mapDispatchToProps)
class NotFound extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className="col-md-8">
                <h1>Not Found</h1>
            </div>
        );
    }
}

export default NotFound;
