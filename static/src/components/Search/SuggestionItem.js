import React, { Component } from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';

class SuggestionItem extends React.Component {
    constructor() {
        super();
    }

    render() {

        return (
            <div>
                <ListItem
                  primaryText={this.props.suggestion}
                  style={{ textAlign: 'left' }}
                  hoverColor={'#dddddd'}
                />
                <Divider />
            </div>
        );
    }
}

SuggestionItem.propTypes = {
    suggestion: PropTypes.string.isRequired,
};

export default SuggestionItem;
