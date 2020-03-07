import React from "react";

export default (props) => (
    <div className="game-board" id="game_board">
        {
            props.diceConfig.map((row, rowId) =>
                (
                    <div className="board-item-row" key={rowId}>
                        {row.map((col, colId) => (
                            <div className="board-item-div" data-x={rowId} data-y={colId} key={colId}>
                                <span>{col}</span>
                            </div>
                        ))
                        }
                    </div>
                )
            )
        };
    </div>
)