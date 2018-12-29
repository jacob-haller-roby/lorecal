import {combineReducers} from 'redux';

import session from './session';
import campaigns from './campaigns';

export default combineReducers({
    session,
    campaigns
});