import React from "react";
import "../../../assets/stylesheets/board.css";
import {bindActionCreators} from "redux";
import {saveCurrentScore} from "../../redux/action/CurrentScore";
import {connect} from "react-redux";
import {emptyDiceConfig} from "../../redux/action/BoggleDice";
import BoardDice from "./BoardDice";

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            intialRandomDice : [['U', 'E', 'S', 'B'], ['Q', 'V', 'V', 'L'], ['P', 'G', 'O', 'Z'], ['L', 'P', 'Y', 'N']],
            word : ''
        };
    }

    getDiceConfig = () => {
        let diceConfig = this.props.diceConfig;
        if(diceConfig.length > 0){
            return diceConfig;
        }
        else
            return this.state.intialRandomDice;
    };

    /*For entering the words*/
    renderForm = () => {
        return (
            <div className="word-submit-section">
                <h3>Submit words</h3>
                <form className="row" onSubmit={this.onSubmit}>
                    <div className="form-group col-8">
                        <input type="text" className="form-control" name="word" id="word_input_text"
                               onChange={this.onChange} placeholder="Type words"
                               disabled={this.props.timeUp}
                               ref={(element) => this.inputWord = element}/>
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
        // resetting the input text to empty when time's up.
        if(this.props.timeUp && this.inputWord){
            this.inputWord.value=''
        }
        return (
            <div className="container">
                <BoardDice diceConfig={this.getDiceConfig()}/>
                {this.renderForm()}
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        timeUp : state.timeUp,
        diceConfig : state.boggleDiceConfig
    };
};

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        saveCurrentScore : saveCurrentScore,
        emptyDiceConfig: emptyDiceConfig
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);