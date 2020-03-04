import {combineReducers} from "redux";
import currentScores from "./CurrentScore";
import scorehistories from "./ScoreHistory";
import timeUp from "./Timer";

const allReducers = combineReducers({
    currentScores : currentScores,
    scoreHistory : scorehistories,
    timeUp : timeUp
});

export default allReducers;