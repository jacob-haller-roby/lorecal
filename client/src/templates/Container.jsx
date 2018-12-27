const React = require('react');
const PropTypes = require('prop-types');
const {connect} = require('react-redux');
const createReactClass = require('create-react-class');

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

module.exports = connect(
    (state) => ({
    }),
    (dispatch) => ({
    })
)(Container);