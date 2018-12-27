import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'; //default?
import reducers from './reducers';

const getMiddleware = () => {
    if (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__) {
        return compose(
            applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__()
        );
    }
    return applyMiddleware(thunk);
};

const STORE = createStore(
    reducers,
    getMiddleware()
);

export default STORE;