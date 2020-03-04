import {SAVE_SCORE_HISTORY} from '../action_type/ActionType';

export const saveScoreHistory = (finalScore) => {
    return {
        type : SAVE_SCORE_HISTORY,
        payload: finalScore
    }
};