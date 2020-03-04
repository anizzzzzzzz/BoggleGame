import React from "react";
import "../../assets/stylesheets/board.css";
import {bindActionCreators} from "redux";
import {saveCurrentScore} from "../redux/action/CurrentScore";
import {connect} from "react-redux";

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            randomAlphabets : [],
            word : '',
            track : 0,
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
                <div className="board-item-row" key={rowId}>
                    {row.map((col, colId) => (
                        <div className="board-item-div" data-x={rowId} data-y={colId} key={colId}>
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
                <form className="row" onSubmit={this.onSubmit}>
                    <div className="form-group col-8">
                        <input type="text" className="form-control" name="word" id="word_input_text"
                               onChange={this.onChange} placeholder="Type words" disabled={this.props.timeUp}/>
                    </div>
                    <button type="submit" className="btn btn-success col-3" disabled={this.props.timeUp}>Submit</button>
                </form>
            </div>
        )
    };

    onChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        // const url = 'api/v1/checkwords';
        let error = this.state.word === "anish";
        let score = {word:this.state.word, score:this.state.word.length, error:error};
        this.props.saveCurrentScore(score);

        this.setState({
            word:'',
        });

        e.target.reset();
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

let mapStateToProps = (state) => {
    return {
        timeUp : state.timeUp
    };
};

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        saveCurrentScore : saveCurrentScore
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);