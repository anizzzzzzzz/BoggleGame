import React, {Component} from 'react';
import "../../../assets/stylesheets/scoreboard.css";
import {Modal, Statistic, Tabs} from 'antd';
import {bindActionCreators} from "redux";
import {timeUp} from "../../redux/action/Timer";
import {connect} from "react-redux";
import {restartCurrentScore} from "../../redux/action/CurrentScore";
import {saveScoreHistory} from "../../redux/action/ScoreHistory";
import CurrentScoreTab from "./CurrentScoreTab";
import ScoreHistoryTab from "./ScoreHistoryTab";
import {InitializationException} from "../../exception/Index";
import {emptyDiceConfig, saveDiceConfig} from "../../redux/action/BoggleDice";

const { TabPane } = Tabs;
const { Countdown } = Statistic;

class ScoreBoard extends Component {
    constructor(props){
        super(props);

        this.state = {
            deadline : 0,
            visible : false,
            playerName : '',
            error : false
        };

        // Setting timeUp to true at first.
        this.props.setTimeUp(true);
    }

    changeMinutesToMilli = (minute) => {
        // return new Date().getTime() + minute * 1000 * 60;
        return new Date().getTime() + minute * 1000 ;
    };

    // After timer is complete, set the timeUp action of redux to true.
    // So that, we can disable input text and button.
    countDownComplete = () =>{
        this.props.setTimeUp(true);
        this.showModal();
    };

    startGame = () => {
        this.fetchBoggleDiceConfig();
        this.props.restartCurrentScore();
        this.setState({
            deadline: this.changeMinutesToMilli(10)
        });
        this.props.setTimeUp(false);
    };

    fetchBoggleDiceConfig = async () => {
        let url = '/init-boggle';
        fetch(url,{
            method: 'GET'
        }).then(response => {
            if(response.ok)
                return response.json();
            throw new InitializationException();
        }).then(response => {
            // console.log('response : ',response.items);
            this.props.saveDiceConfig(response.items);
        }).catch(ex => {
            if (ex instanceof InitializationException) {
                this.setState({error:true});
            }
        });
    };

    /* ----------------------- Player Name Modal ------------------------------------*/
    savePlayerNameModal = () => {
        const { visible } = this.state;
        return (
            <Modal
                title="Title"
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}>
                <input type="text" className="form-control" name="playerName"
                       onChange={this.onChange} placeholder="Your Name"
                       ref={(element) => this.playername = element}/>
            </Modal>
        )
    };

    onChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (event) => {
        let finalScore = this.props.currentScores.filter(score => score.error!==true)
                            .reduce((total, object) => total + object.score,0);
        let score = {name: this.state.playerName, finalScore:finalScore};
        this.props.saveScoreHistory(score);
        // this.props.restartCurrentScore();
        this.setState({
            visible: false
        });
        // resetting the playername input field
        this.playername.value = '';
    };

    handleCancel = () => {
        // this.props.restartCurrentScore();
        this.setState({
            visible: false,
        });
        // resetting the playername input field
        this.playername.value = '';
    };
    /* ----------------------- End Player Name Modal ------------------------------------*/

    render() {
        const displayMessage = this.state.error?"error-message-show":"error-message-hide";
        return (
            <div className="score-board">
                {this.savePlayerNameModal()} {/*Modal*/}
                <p className={"error-message "+displayMessage}>Some error occured while initializing the board. Try again later.</p>
                <div className="header pb-2 d-flex justify-content-between">
                    <button className="btn btn-info h-25 align-middle" onClick={this.startGame}>New Game</button>
                    <Countdown className="ml-auto mr-0" title="Countdown" style={{ fontSize: 15 }}
                               value={this.state.deadline} onFinish={this.countDownComplete} format="mm:ss"/>
                </div>

                <div className="score-board-tabs">
                    <Tabs type="card">
                        <TabPane tab="Score" key="1">
                            <CurrentScoreTab currentScores={this.props.currentScores}/>
                        </TabPane>
                        <TabPane tab="Score History" key="2">
                            <ScoreHistoryTab scoreHistory={this.props.scoreHistory}/>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        currentScores : state.currentScores,
        scoreHistory : state.scoreHistory
    }
};

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setTimeUp : timeUp,
        restartCurrentScore : restartCurrentScore,
        saveScoreHistory : saveScoreHistory,
        saveDiceConfig : saveDiceConfig,
        emptyDiceConfig : emptyDiceConfig
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ScoreBoard);