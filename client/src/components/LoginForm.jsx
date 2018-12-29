import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import createReactClass from 'create-react-class';
import {TextField, Button} from '@material-ui/core';

import {login} from '../redux/actions/sessionActionCreator';

const LoginForm = createReactClass({

    propTypes: {
        login: PropTypes.func.isRequired,
        loginFailureTimestamp: PropTypes.number
    },

    getInitialState() {
        return {
            username: '',
            password: ''
        };
    },

    handleChange(field) {
        return (event) => {
            this.setState({
                [field]: event.target.value,
                editTimestamp: Date.now()
            });
        };
    },

    handleLogin() {
        this.props.login(this.state.username, this.state.password, this.props.location.from && this.props.location.from.pathname);
    },

    showError() {
        return this.props.loginFailureTimestamp && this.props.loginFailureTimestamp > this.state.editTimestamp;
    },

    render() {
        return (
            <div>
                <h1>Login</h1>

                <br/>

                <TextField
                    id="username"
                    label="username"
                    value={this.state.username}
                    onChange={this.handleChange('username')}
                    margin="normal"
                    variant="outlined"
                    error={this.showError()}
                />

                <br/>

                <TextField
                    id="password"
                    label="password"
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    margin="normal"
                    variant="outlined"
                    type="password"
                    error={this.showError()}
                />

                <br/>

                <Button variant="contained"
                        onClick={this.handleLogin}
                        color="primary"
                >
                    Login
                </Button>

            </div>
        );
    }
});

export default connect(
    (state) => ({
        loginFailureTimestamp: state.session.loginFailureTimestamp
    }),
    (dispatch) => ({
        login: (username, password, to) => dispatch(login(username, password, to))
    })
)(LoginForm);