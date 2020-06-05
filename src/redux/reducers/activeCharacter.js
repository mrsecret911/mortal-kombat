import { SET_ACTIVE_CHARACTER } from '../actions';

function activeCharacter(state = null, { type, payload }) {
    switch (type) {
        case SET_ACTIVE_CHARACTER:
            return { ...payload };
        default:
            return state;
    }
}

export default activeCharacter;