import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "../component/homepage/Homepage";

export default (
    <Router>
        <Switch>
            <Route path="/" exact component={Homepage} />
        </Switch>
    </Router>
);