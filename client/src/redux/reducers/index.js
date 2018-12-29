import {combineReducers} from 'redux';

import session from './session';
import campaigns from './campaigns';
import selected from './selected';

export default combineReducers({
    session,
    campaigns,
    selected
});