import ACTIONS from '../actions/actions';

export const selectCampaign = (campaignId) => ({
    type: ACTIONS.SELECT_CAMPAIGN,
    payload: campaignId
});