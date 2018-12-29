import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import createReactClass from 'create-react-class';
import {Button, IconButton, Popover, MenuItem, MenuList, withStyles} from '@material-ui/core';
import {Person, ExitToApp} from '@material-ui/icons';
import {Link} from 'react-router-dom';

import {logout} from '../redux/actions/sessionActionCreator';
import selectors from '../redux/selectors';
const {isLoggedIn} = selectors;

const styles = {
    menuIcon: {
        verticalAlign: 'text-bottom',
        paddingLeft: '5px'
    }
};

const LoginButton = createReactClass({

    propTypes: {
        logout: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        classes: PropTypes.object.isRequired
    },

    getInitialState() {
        return {open: false};
    },

    openMenu(event) {
        this.setState({
            anchorEl: event.target,
            open: true
        });
    },

    closeMenu() {
        this.setState({
            anchorEl: null,
            open: false
        });
    },

    toggleMenu(event) {
        this.state.open ? this.closeMenu() : this.openMenu(event);
    },

    logout() {
        this.setState({
            open: false
        });
        this.props.logout();
    },

    render() {
        return this.props.isLoggedIn ? this.renderLogoutButton() : this.renderLoginButton();
    },

    renderLoginButton() {
        return (
            <Button variant="contained"
                    color="secondary"
                    component={Link}
                    to='/login'
            >
                Login
            </Button>
        );
    },

    renderLogoutButton() {
        return (
            <div>
                <IconButton onClick={this.toggleMenu}>
                    <Person/>
                </IconButton>
                <Popover
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onClose={this.closeMenu}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                >
                    <MenuList>
                        <MenuItem onClick={this.logout}>
                            <span>
                                <span>Logout</span>
                                <ExitToApp className={this.props.classes.menuIcon}/>
                            </span>
                        </MenuItem>
                    </MenuList>
                </Popover>
            </div>
        );
    }
});

export default connect(
    (state) => ({
        isLoggedIn: isLoggedIn(state)
    }),
    (dispatch) => ({
        logout: () => dispatch(logout())
    })
)(withStyles(styles)(LoginButton));