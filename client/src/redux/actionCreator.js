import history from '../history';
import ACTIONS from './actions';
import {get, post} from './helper';


export const verifyLoginStatus = () =>
        dispatch =>
            get('Users/me')
                .then(response => {
                    dispatch({
                        type: ACTIONS.LOGIN,
                        payload: {
                            currentUserId: response.id,
                            currentUsername: response.username
                        }
                    });
                })
                .catch(() => {
                    dispatch({
                        type: ACTIONS.LOGOUT
                    });
                })
                .finally(() => {
                    dispatch({
                        type: ACTIONS.LOGIN_STATUS_CONFIRMED
                    })
                });

export const login = (username, password) =>
        dispatch =>
            post('/login', {username, password})
                .then(response => {
                    dispatch({
                        type: ACTIONS.LOGIN,
                        payload: {
                            currentUserId: response.userId,
                            currentUsername: username
                        }
                    });
                })
                .then(() => history.push('/'))
                .catch(() => {
                    dispatch({
                        type: ACTIONS.LOGIN_FAILURE
                    });
                });

export const logout = () =>
        dispatch =>
            post('Users/logout')
                .then(() => {
                    dispatch({
                        type: ACTIONS.LOGOUT
                    });
                })
                .then(() => history.push('/'));