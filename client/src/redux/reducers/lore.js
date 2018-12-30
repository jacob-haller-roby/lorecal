import ACTIONS from '../actions/actions';

const reducer = (state = {}, action) => {
    let newState = {...state};
    switch (action.type) {
        case ACTIONS.GET_CAMPAIGN_LORE:
            newState[action.payload.campaignId] = action.payload.lore;
            return newState;
        default:
            return state;

    }
};

export default reducer;