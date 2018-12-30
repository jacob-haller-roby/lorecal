import ACTIONS from '../actions/actions';

const reducer = (state = {}, action) => {
    let newState = {...state};
    switch (action.type) {
        case ACTIONS.GET_CAMPAIGNS:
            action.payload.forEach(campaign => {
                newState[campaign.id] = campaign;
            });
            return newState;
        case ACTIONS.CREATE_CAMPAIGN:
            newState[action.payload.id] = action.payload;
            return newState;
        case ACTIONS.GET_CAMPAIGN_LORE:
            newState[action.payload.campaignId] = {
                ...newState[action.payload.campaignId],
                lore: action.payload.lore
            };
            return newState;
        default:
            return state;

    }
};

export default reducer;