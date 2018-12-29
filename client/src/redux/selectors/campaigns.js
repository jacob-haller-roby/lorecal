import {createSelector} from 'reselect';

export const myDmCampaigns = state => {
    return Object.values(state.campaigns).filter(campaign => campaign.dm_id === state.session.currentUserId)
};

export const myPlayerCampaigns = state => {
    return Object.values(state.campaigns).filter(campaign => campaign.users.some(user => user.id === state.session.currentUserId));
};

export const myCampaigns = createSelector(myDmCampaigns, myPlayerCampaigns,
    (myDmCampaigns, myPlayerCampaigns) => {
        return [].concat(myPlayerCampaigns).concat(myDmCampaigns);
    }
);

export default {
    myCampaigns,
    myDmCampaigns,
    myPlayerCampaigns
}