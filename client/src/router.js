import React from 'react';
import PropTypes from 'prop-types';
import store from './redux/store';
import {Provider} from 'react-redux';
import {Router, Route} from 'react-router-dom';
import {MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import {Paper} from '@material-ui/core';

import history from './history';
import theme from './theme';

import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import Campaigns from './components/Campaigns';

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
                        <Route path="/campaigns" component={Campaigns}/>
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