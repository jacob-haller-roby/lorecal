import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import selectors from '../redux/selectors';

const {isLoggedIn} = selectors;

const PrivateRouteHOC = (Component) => {
    const Switch = (props) =>
        props.isLoggedIn ?
            <Component {...props}/> :
            <Redirect to={{pathname: "/login", from: props.location}}/>

    return connect(
        (state) => ({
            isLoggedIn: isLoggedIn(state)
        }),
        (dispatch) => ({})
    )(Switch)
};

export default PrivateRouteHOC;