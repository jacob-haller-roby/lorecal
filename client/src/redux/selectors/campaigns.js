import {createSelector} from 'reselect';
import {uniq} from "./helper";

export const myDmCampaigns = state => {
    return Object.values(state.campaigns).filter(campaign => campaign.dm_id === state.session.currentUserId)
};

export const myPlayerCampaigns = state => {
    return Object.values(state.campaigns).filter(campaign => campaign.users && campaign.users.some(user => user.id === state.session.currentUserId));
};

export const myCampaigns = createSelector(myDmCampaigns, myPlayerCampaigns,
    (myDmCampaigns, myPlayerCampaigns) =>
        uniq(
            [].concat(myPlayerCampaigns).concat(myDmCampaigns),
            campaign => campaign.id
        )
);

export const selectedCampaignId = state => state.selected.campaignId;

export const selectedCampaign = createSelector(myCampaigns, selectedCampaignId,
    (campaigns, campaignId) => campaigns.find(campaign => campaign.id === campaignId) || {}
);

export default {
    myCampaigns,
    myDmCampaigns,
    myPlayerCampaigns,
    selectedCampaign,
    selectedCampaignId
}