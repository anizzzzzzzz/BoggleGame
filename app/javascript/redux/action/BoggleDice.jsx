import {EMPTY_DICE_CONFIG_BOGGLE, SAVE_DICE_CONFIG_BOGGLE} from "../action_type/ActionType";

export const saveDiceConfig = (diceArray) => {
    return {
        type: SAVE_DICE_CONFIG_BOGGLE,
        payload: diceArray
    }
};

export const emptyDiceConfig = () => {
    return {
        type: EMPTY_DICE_CONFIG_BOGGLE
    }
};