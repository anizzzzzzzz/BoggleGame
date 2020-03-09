import React from "react";
import "../../../assets/stylesheets/board.css";
import {bindActionCreators} from "redux";
import {saveCurrentScore} from "../../redux/action/CurrentScore";
import {connect} from "react-redux";
import {emptyDiceConfig} from "../../redux/action/BoggleDice";
import BoardDice from "./BoardDice";
import {BoggleException} from "../../exception/Index";

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            intialRandomDice : [['U', 'E', 'S', 'B'], ['Q', 'V', 'V', 'L'], ['P', 'G', 'O', 'Z'], ['L', 'P', 'Y', 'N']],
            word : '',
            disabled : false
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
                               disabled={this.props.timeUp && this.state.disabled}
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
        const url = 'check';
        if(this.state.word.length === 0)
            return;

        this.setState({disabled:true});
        const submittedWords = this.props.currentScores
            .filter(score => score.error!==true).map(score => score.word);
        const body = {
            word : this.state.word,
            board : this.props.diceConfig,
            // board :[["N","T","L","S"],["I","H","M","E"],["O","V","Y","S"],["B","L","W","E"]],
            submittedWords: submittedWords
        };
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method : 'POST',
            headers : {
                'X-CSRF-Token': token,
                "Content-Type": 'application/json'
            },
            body : JSON.stringify(body)
        })
            .then(response => {
            if(response.ok)
                return response.json();
            throw new BoggleException();
        }).then(response => {
            response['id'] = this.props.currentScores.length;
            this.props.saveCurrentScore(response);
        }).catch(ex => {
            if (ex instanceof BoggleException) {
                console.log(ex);
            }
        });

        this.setState({
            word:'',
            disabled:false
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
        currentScores : state.currentScores,
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