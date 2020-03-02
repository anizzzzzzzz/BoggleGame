import React from "react";
import '../../assets/stylesheets/board.css';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            randomAlphabets : [],
            foundWords : {},
            word : ''
        };
    }

    componentDidMount() {
        for(let i=0; i<4; i++)
            this.setState(prevState => ({
                    randomAlphabets:[...prevState.randomAlphabets, this.generateRandomAlphabet()]
            }));
    }

    generateRandomAlphabet = () => {
        let num = [];
        for(let i=0; i<4; i++)
            num.push(String.fromCharCode(65+Math.floor(Math.random() * 26)));
        return num;
    };

    render4By4Board = () => {
        return (
            <div className="game-board" id="game_board">
                {this.createBoardColumns()}
            </div>
        )
    };

    createBoardColumns = () => {
        return this.state.randomAlphabets.map((row, rowId) =>
            (
                <div className="row" id={"s-" + row} key={rowId}>
                    {row.map((col, colId) => (
                        <div className="col-3 board-item-div" key={colId}>
                            <span>{col}</span>
                        </div>
                    ))
                    }
                </div>
            )
        );
    };

    renderForm = () => {
        return (
            <div className="word-submit-section">
                <h3>Submit words</h3>
                <form className="row">
                    <div className="form-group col-6">
                        <input type="text" className="form-control" name="word" id="word_input_text" placeholder="Type words"/>
                    </div>
                    <button type="submit" className="btn btn-success col-4">Submit</button>
                </form>
            </div>
        )
    };

    render() {
        return (
            <div className="container">
                {this.render4By4Board()}
                {this.renderForm()}
            </div>
        );
    }
}

export default Board;