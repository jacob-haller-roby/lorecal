import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import createReactClass from 'create-react-class';

const Container = createReactClass({

    propTypes: {
    },

    getInitialState() {
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
)(Container);