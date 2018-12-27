import { keyMirror } from './helper';

const ACTIONS = {
    LOGIN: undefined,
    LOGIN_FAILURE: undefined,
    LOGOUT: undefined,
    LOGIN_STATUS_CONFIRMED: undefined
};

export default keyMirror(ACTIONS);