import {EMPTY_DICE_CONFIG_BOGGLE, SAVE_DICE_CONFIG_BOGGLE} from "../action_type/ActionType";

const boggleConfig = (state=[], action) => {
    switch (action.type) {
        case SAVE_DICE_CONFIG_BOGGLE:
            return action.payload;
        case EMPTY_DICE_CONFIG_BOGGLE:
            return [];
        default:
            return state;
    }
};

export default boggleConfig;