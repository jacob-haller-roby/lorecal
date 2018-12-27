import React from'react';
import PropTypes from'prop-types';
import {connect} from'react-redux';
import createReactClass from'create-react-class';

const Campaigns = createReactClass({

    propTypes: {
    },

    getInitialState() {
        return {};
    },

    render() {
        return (
            <div>
            </div>
        );
    }
});

export default connect(
    (state) => ({
    }),
    (dispatch) => ({
    })
)(Campaigns);