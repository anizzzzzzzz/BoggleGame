import React from 'react';
import "../../../assets/stylesheets/scoreboard.css";

export default (props) => (
    <div className="score-history">
        <table className="table table-striped">
            <thead>
            <tr>
                <th scope="col">SNo.</th>
                <th scope="col">Name</th>
                <th scope="col">Final Score</th>
            </tr>
            </thead>
            <tbody>
            {
                props.scoreHistory
                    .sort((a,b) => (a.name < b.name)?1:-1)
                    .sort((a,b) => (a.finalScore < b.finalScore)?1:-1)
                    .map((hist, index) => (
                        <tr key={index+1}>
                            <td>{index+1}</td>
                            <td>{hist.name}</td>
                            <td>{hist.finalScore}</td>
                        </tr>
                    ))
            }
            </tbody>
        </table>
    </div>
);