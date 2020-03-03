import React, {Component} from 'react';
import { Tabs } from 'antd';
import "../../assets/stylesheets/scoreboard.css";

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}
class ScoreBoard extends Component {
    constructor(props){
        super(props);

    }

    render() {
        return (
            <div className="score-board">
                <Tabs onChange={callback} type="card">
                    <TabPane tab="Score" key="1">
                        Content of Tab Pane 1
                    </TabPane>
                    <TabPane tab="Score History" key="2">
                        Content of Tab Pane 2
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default ScoreBoard;