import {combineReducers} from 'redux';

import session from './session';
import campaigns from './campaigns';
import selected from './selected';
import lore from './lore';

export default combineReducers({
    session,
    campaigns,
    selected,
    lore
});