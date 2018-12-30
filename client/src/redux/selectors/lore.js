import {createSelector} from 'reselect';
import {selectedCampaignId} from "./campaigns";

export const getLore = state => state.lore || {};

export const selectedLoreOrdered = createSelector(selectedCampaignId, getLore,
    (campaignId, lore) => {
        const result = {};
        const campaignLore = lore[campaignId] || [];
        campaignLore.forEach(loreEntry => {
            if (!result[loreEntry.day]) result[loreEntry.day] = [];
            result[loreEntry.day].push(loreEntry);
        });

        Object.values(result).forEach(value => value.sort((a, b) => a.day - b.day));

        return result;
    }
);

export default {
    selectedLoreOrdered
}