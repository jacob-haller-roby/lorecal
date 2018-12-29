import React from 'react';
import PropTypes from 'prop-types';
import store from '../redux/store';
import {Provider} from 'react-redux';
import {Router, Route} from 'react-router-dom';
import {MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import {Paper} from '@material-ui/core';

import history from '../history';
import theme from '../theme';

import PrivateRoute from './PrivateRoute';
import Navbar from '../containers/Navbar';
import LoginForm from './LoginForm';
import Campaigns from './Campaigns';
import Campaign from './Campaign';

const Index = () => <h2>Home</h2>;

const styles = (theme) => ({
    toolbar: theme.mixins.toolbar
});

const AppRouter = (props) => (
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <Router history={history}>
                <div>
                    <Navbar/>
                    <div className={props.classes.toolbar}/>
                    <Paper style={{padding: 25}}>
                        <Route path="/" exact component={Index}/>
                        <Route path="/login" component={LoginForm}/>
                        <Route path="/campaigns" component={PrivateRoute(Campaigns)}/>
                        <Route path="/campaign/:id" component={PrivateRoute(Campaign)}/>
                    </Paper>
                </div>
            </Router>
        </MuiThemeProvider>
    </Provider>
);

AppRouter.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppRouter);