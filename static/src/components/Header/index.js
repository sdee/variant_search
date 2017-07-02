import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

@connect(mapStateToProps, mapDispatchToProps)
export class Header extends Component {
    constructor(props) {
        super(props);
    }

    dispatchNewRoute(route) {
        browserHistory.push(route);
    }

    render() {
        return (
            <header>
                <AppBar
                  title="Variant Search"
									showMenuIconButton={false}
                />
            </header>

        );
    }
}

Header.propTypes = {

};
