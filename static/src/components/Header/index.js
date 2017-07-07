import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';

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
