import ACTIONS from '../actions';

const reducer = (state = {}, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return Object.assign({}, state, {
                currentUserId: action.payload.currentUserId,
                currentUsername: action.payload.currentUsername
            });
        case ACTIONS.LOGIN_FAILURE:
            return Object.assign({}, state, {
                loginFailureTimestamp: Date.now()
            });
        case ACTIONS.LOGOUT:
            return Object.assign({}, state, {
                currentUserId: null,
                currentUsername: null
            });
        case ACTIONS.LOGIN_STATUS_CONFIRMED:
            return Object.assign({}, state, {
                loginStatusConfirmed: true
            });
        default:
            return state;

    }
};

export default reducer;