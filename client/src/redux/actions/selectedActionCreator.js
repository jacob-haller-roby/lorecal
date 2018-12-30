import ACTIONS from '../actions/actions';
import {getCampaignLore} from './campaignActionCreator';

export const selectCampaign = (campaignId) =>
    dispatch => {
        dispatch(getCampaignLore(campaignId))
            .then(() => dispatch({
                type: ACTIONS.SELECT_CAMPAIGN,
                payload: campaignId
            }));
    };
