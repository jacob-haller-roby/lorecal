import { keyMirror } from './helper';

const ACTIONS = {
    LOGIN: undefined,
    LOGIN_FAILURE: undefined,
    LOGOUT: undefined,
    LOGIN_STATUS_CONFIRMED: undefined,
    GET_CAMPAIGNS: undefined
};

export default keyMirror(ACTIONS);