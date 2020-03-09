import React from 'react';
import "../../../assets/stylesheets/scoreboard.css";

export default (props) => (
    <section className="current-score-section">
        <div className="current-score-error-message">**Note: Hover on the row to view the error message.**</div>
        <div className="current-score">
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Word</th>
                    <th scope="col"> </th>
                    <th scope="col">Score</th>
                </tr>
                </thead>
                <tbody>
                {props.currentScores.sort((a,b) => (a.id < b.id)?1:-1)
                    .map((score, index) => (
                    <tr key={index} className={score.error?"score-item error":"score-item"} title={score.message}>
                        <td>{score.word}</td>
                        <td>:</td>
                        <td>{score.score}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        <div className="current-total-score">
            <span>Total Score : </span>
            <span>{props.currentScores.filter(score => score.error!==true).reduce((total, object) => total + object.score,0)}</span>
        </div>
    </section>
);
