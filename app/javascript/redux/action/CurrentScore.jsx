import {RESTARTING_CURRENT_SCORE, SAVE_CURRENT_SCORE} from '../action_type/ActionType';

export const saveCurrentScore = (score) => {
    return {
        type : SAVE_CURRENT_SCORE,
        payload : score
    }
};

export const restartCurrentScore = () =>{
    return {
        type : RESTARTING_CURRENT_SCORE
    }
};