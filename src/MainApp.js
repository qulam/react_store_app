import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {PersistGate} from 'redux-persist/integration/react'
import configureStore, {history} from "./store";
import App from "./containers/App";
export const confStore = configureStore();
const store = confStore.store;
const persistor = confStore.persistor;


const MainApp = () =>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router history={history}>
                <Switch>
                    <Route path="/" component={App}/>
                </Switch>
            </Router>
        </PersistGate>
    </Provider>
;


export default MainApp;