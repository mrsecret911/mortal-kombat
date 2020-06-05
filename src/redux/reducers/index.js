import { combineReducers } from 'redux';

import activeCharacter from './activeCharacter';

const reducer = combineReducers({
    activeCharacter
});

export default reducer;