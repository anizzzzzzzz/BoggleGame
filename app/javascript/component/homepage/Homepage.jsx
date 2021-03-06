import React from "react";
import Board from "../board/Board";
import ScoreBoard from "../score/ScoreBoard";

export default () => (
    <div className="container">
        <div className="row mt-5">
            <div className="col-7">
                <Board/>
            </div>
            <div className="col-5">
                <ScoreBoard/>
            </div>
        </div>
    </div>
);