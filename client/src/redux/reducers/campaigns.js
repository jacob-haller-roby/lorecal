import ACTIONS from '../actions/actions';

const reducer = (state = {}, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case ACTIONS.GET_CAMPAIGNS:
            action.payload.forEach(campaign => {
                newState[campaign.id] = campaign;
            });
            return newState;
        case ACTIONS.CREATE_CAMPAIGN:
            newState[action.payload.id] = action.payload;
            return newState;
        default:
            return state;

    }
};

export default reducer;