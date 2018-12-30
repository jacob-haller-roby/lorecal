import { keyMirror } from './helper';

const ACTIONS = {
    LOGIN: undefined,
    LOGIN_FAILURE: undefined,
    LOGOUT: undefined,
    LOGIN_STATUS_CONFIRMED: undefined,
    GET_CAMPAIGNS: undefined,
    CREATE_CAMPAIGN: undefined,
    GET_CAMPAIGN_LORE: undefined,

    //SELECTS
    SELECT_CAMPAIGN: undefined
};

export default keyMirror(ACTIONS);