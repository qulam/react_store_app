import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {NavLink} from 'react-router-dom';
import {forceQuit, signOut} from "../../actions/Auth";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {useHistory} from "react-router-dom";

const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <>
            <header className="app-header">
                <nav className="navbar navbar-expand-lg navbar-light bg-blue">
                    <NavLink to="/app/dashboard" className="app-logo nav-link text-white mr-5">Store App</NavLink>
                    <div className="app-logout-wrapper">
                        <ExitToAppIcon className="app-logout" onClick={() => dispatch(signOut(history))} />
                    </div>
                </nav>
            </header>
        </>
    )
};

export default Header;