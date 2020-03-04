import {TIME_UP} from '../action_type/ActionType';

const timeUp = (state=true, action) => {
    switch (action.type) {
        case TIME_UP:
            return action.payload;
        default:
            return state;
    }
};

export default timeUp;