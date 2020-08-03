import React, {Component, useEffect, useState} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import axios from '../util/Api';
import '../styles/App.css';
import MainApp from '../app/index';
import SignIn from './Signin';
import {forceQuit,} from '../actions/Auth';
import asyncComponent from '../util/asyncComponent';
import CircularProgress from "../components/CircularProgress";

const RestrictedRoute = ({component: Component, authUser, token, ...rest}) => {
    const dispatch = useDispatch();
    const [auth, setAuth] = useState(false);
    const [isTokenValidated, setIsTokenValidated] = useState(false);
    const accessToken = useSelector(state => state.auth.access_token);
    useEffect(() => {
        if (accessToken) {
            axios.get(`users?access=${accessToken}`)
                .then((res) => {
                    if (res.status === 200 && res.data.length > 0) {
                        setAuth(true);
                    } else {
                        /*Fake 401 un authorization error*/
                        dispatch(forceQuit());
                        setAuth(false);
                        localStorage.clear();
                    }
                })
                .catch((err) => {
                    setAuth(false);
                    localStorage.clear();
                })
                .then(() => setIsTokenValidated(true));
        } else {
            setIsTokenValidated(true);
        }
    }, []);

    if (!isTokenValidated) return <CircularProgress/>;

    return (
        <Route
            {...rest}
            render={props => {
                return (
                    auth
                        ? <Component {...props} />
                        : <Redirect
                            to={{
                                pathname: '/signin',
                                state: {from: props.location}
                            }}
                        />
                )
            }}
        />)
};


const App = () => {

    const {access_token, authUser,} = useSelector(state => state.auth);
    if (window.location.pathname === '/') {
        if (access_token === null || !authUser) {
            return (<Redirect to={'/signin'}/>);
        } else {
            return (<Redirect to={'/app/dashboard'}/>);
        }
    }

    return (
        <div className="app-main">
            <Switch>
                <RestrictedRoute path={`/app`} authUser={authUser} token={access_token}
                                 component={MainApp}/>
                <Route path='/signin' component={SignIn}/>
                <Route
                    component={asyncComponent(() => import('../components/Error404'))}/>
            </Switch>
        </div>
    );
};

export default App;