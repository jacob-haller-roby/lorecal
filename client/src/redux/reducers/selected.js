import ACTIONS from '../actions/actions';

const reducer = (state = {}, action) => {
    switch (action.type) {
        case ACTIONS.SELECT_CAMPAIGN:
            return Object.assign({}, state, {campaignId: action.payload});
        default:
            return state;

    }
};

export default reducer;