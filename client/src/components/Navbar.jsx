import React from 'react';
import {Link} from 'react-router-dom';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {AppBar, Toolbar, Button, Typography, withStyles} from '@material-ui/core';

import LoginButton from './LoginButton';
import {verifyLoginStatus} from '../redux/actionCreator';

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
                        <Button component={Link} to='/' color="inherit">Home</Button>
                        <Button component={Link} to='/campaigns' color="inherit">Campaigns</Button>
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