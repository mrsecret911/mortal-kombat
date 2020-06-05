export const SET_ACTIVE_CHARACTER = 'SET_ACTIVE_CHARACTER';

export const setActiveCharacter = character => {
    return {
        type: SET_ACTIVE_CHARACTER,
        payload: character
    };
}