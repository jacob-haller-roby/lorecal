import ACTIONS from './actions';
import {get, post} from './helper';

export const getMyCampaigns = () =>
    (dispatch, getState) => {
        let userId = getState().session.currentUserId;
        Promise.all([
            get('campaign/dm/' + userId)
                .then(campaigns => {
                    dispatch({
                        type: ACTIONS.GET_CAMPAIGNS,
                        payload: campaigns
                    })
                }),
            get('campaign/player/' + userId)
                .then(campaigns => {
                    dispatch({
                        type: ACTIONS.GET_CAMPAIGNS,
                        payload: campaigns
                    })
                })
        ])
    };
