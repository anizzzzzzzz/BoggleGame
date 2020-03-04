import React, {Component} from 'react';
import "../../assets/stylesheets/scoreboard.css";
import {Modal, Statistic, Tabs} from 'antd';
import {bindActionCreators} from "redux";
import {timeUp} from "../redux/action/Timer";
import {connect} from "react-redux";
import {restartCurrentScore} from "../redux/action/CurrentScore";
import {saveScoreHistory} from "../redux/action/ScoreHistory";
import PlayerScore from "./PlayerScore";
import ScoreHistory from "./ScoreHistory";

const { TabPane } = Tabs;
const { Countdown } = Statistic;

class ScoreBoard extends Component {
    constructor(props){
        super(props);

        this.state = {
            deadline : this.changeMinutesToMilli(10),
            visible : false,
            playerName : ''
        };

        this.props.setTimeUp(false);
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

    restartGame = () => {
        this.props.restartCurrentScore();
        this.setState({
            deadline: this.changeMinutesToMilli(10)
        });
        this.props.setTimeUp(false);
    };

    /* ----------------------- Player Modal ------------------------------------*/
    savePlayerFinalScore = () => {
        const { visible } = this.state;
        return (
            <Modal
                title="Title"
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}>
                <input type="text" className="form-control" name="playerName" onChange={this.onChange} placeholder="Your Name"/>
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

    handleOk = () => {
        let finalScore = this.props.currentScores.reduce((total, object) => total + object.score,0);
        let score = {name: this.state.playerName, finalScore:finalScore};
        this.props.saveScoreHistory(score);

        this.props.restartCurrentScore();

        this.setState({
            visible: false,
            confirmLoading: false,
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    /* ----------------------- Player Modal ------------------------------------*/

    render() {
        return (
            <div className="score-board">
                {this.savePlayerFinalScore()}
                <div className="header pb-2 d-flex justify-content-between">
                    <button className="btn btn-info h-25 align-middle" onClick={this.restartGame}>New Game</button>
                    <Countdown className="ml-auto mr-0" title="Countdown" style={{ fontSize: 15 }}
                               value={this.state.deadline} onFinish={this.countDownComplete} format="mm:ss"/>
                </div>

                <div className="score-board-tabs">
                    <Tabs type="card">
                        <TabPane tab="Score" key="1">
                            <PlayerScore currentScores={this.props.currentScores}/>
                        </TabPane>
                        <TabPane tab="Score History" key="2">
                            <ScoreHistory scoreHistory={this.props.scoreHistory}/>
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
        saveScoreHistory : saveScoreHistory
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ScoreBoard);