import React from 'react';
import {Link} from 'react-router-dom';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {AppBar, Toolbar, Button, Typography, withStyles} from '@material-ui/core';

import LoginButton from './LoginButton';
import NavButton from '../components/NavButton';
import {verifyLoginStatus} from '../redux/actions/sessionActionCreator';

const classes = {
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    noSelect: {
        userSelect: 'none'
    }
};

const Navbar = createReactClass({
    propTypes: {
        verifyLoginStatus: PropTypes.func.isRequired,
        classes: PropTypes.object.isRequired
    },

    componentDidMount() {
        this.props.verifyLoginStatus();
    },
    render() {
        let {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar>
                    <Toolbar>
                        <NavButton to='/'>
                            Home
                        </NavButton>
                        <NavButton to='/campaigns'>
                            Campaigns
                        </NavButton>
                        <Typography className={classes.grow}/>
                        <LoginButton/>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
});

export default connect(
    () => ({}),
    (dispatch) => ({
        verifyLoginStatus: () => dispatch(verifyLoginStatus())
    })
)(withStyles(classes)(Navbar));