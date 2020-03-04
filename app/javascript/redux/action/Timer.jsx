import {TIME_UP} from '../action_type/ActionType';

export const timeUp = (timesUp) => {
    return {
        type : TIME_UP,
        payload : timesUp
    }
};
