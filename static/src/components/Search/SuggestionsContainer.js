import React from 'react';
import List from 'material-ui/List';
import PropTypes from 'prop-types';

class SuggestionsContainer extends React.Component {

    render() {

        const { rest } = this.props;
        const children = this.props.children;
        return (
            <List {...rest}>
                {children}
            </List>

        );
    }
}

SuggestionsContainer.propTypes = {
    children: PropTypes.element,
    rest: PropTypes.object,
};

export default SuggestionsContainer;
