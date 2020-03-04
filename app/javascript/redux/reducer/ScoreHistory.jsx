import {SAVE_SCORE_HISTORY} from '../action_type/ActionType';

const scorehistories = (state=[], action) => {
    switch (action.type) {
        case SAVE_SCORE_HISTORY:
            return [...state, Object.assign({}, action.payload)];
        default:
            return state;
    }
};

export default scorehistories;