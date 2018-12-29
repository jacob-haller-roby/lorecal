import ACTIONS from '../actions/actions';

const reducer = (state = {}, action) => {
    switch (action.type) {
        case ACTIONS.GET_CAMPAIGNS:
            let newState = Object.assign({}, state);
            action.payload.forEach(campaign => {
                newState[campaign.id] = campaign;
            });
            return newState;
        default:
            return state;

    }
};

export default reducer;