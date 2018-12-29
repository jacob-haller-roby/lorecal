import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import CircularProgressCentered from '../components/CircularProgressCentered';

import selectors from '../redux/selectors';

const {isLoggedIn, loginStatusConfirmed} = selectors;

const PrivateRouteHOC = (Component) => {
    const Switch = (props) => {
        if (!props.loginStatusConfirmed) {
            return <CircularProgressCentered/>;
        }

        return props.isLoggedIn ?
            <Component {...props}/> :
            <Redirect to={{pathname: "/login", from: props.location}}/>;
    };


    return connect(
        (state) => ({
            isLoggedIn: isLoggedIn(state),
            loginStatusConfirmed: loginStatusConfirmed(state)
        }),
        (dispatch) => ({})
    )(Switch)
};

export default PrivateRouteHOC;