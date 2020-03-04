import React from "react";
import {render} from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from "../component/App";
import 'antd/dist/antd.css';
import {Provider} from "react-redux";
import {persistor, store} from "../redux/store/Index";
import {PersistGate} from 'redux-persist/lib/integration/react';

document.addEventListener("DOMContentLoaded", () => {
    render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App/>
            </PersistGate>
        </Provider>,
        document.body.appendChild(document.createElement("div"))
    );
});