import {combineReducers} from "redux";
import currentScores from "./CurrentScore";
import scorehistories from "./ScoreHistory";
import timeUp from "./Timer";
import boggleConfig from "./BoggleDice";

const allReducers = combineReducers({
    currentScores : currentScores,
    scoreHistory : scorehistories,
    timeUp : timeUp,
    boggleDiceConfig : boggleConfig
});

export default allReducers;