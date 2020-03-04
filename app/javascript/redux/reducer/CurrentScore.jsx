import {SAVE_CURRENT_SCORE, RESTARTING_CURRENT_SCORE} from '../action_type/ActionType';

const currentScores = (state=[], action) => {
    switch (action.type) {
        // saving the current score of a player.
        case SAVE_CURRENT_SCORE:
            return [...state, Object.assign({}, action.payload)];
        // restarting the current score.
        case RESTARTING_CURRENT_SCORE:
            return [];
        default:
            return state;
    }
};

export default currentScores;