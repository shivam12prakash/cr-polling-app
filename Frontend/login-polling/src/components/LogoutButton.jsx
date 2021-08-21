import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { Router, Switch, Route,Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
    const { logout,isAuthenticated } = useAuth0();
    let history = useHistory();

    return (
        isAuthenticated && (
            <div>
                <button onClick={() => logout()}>
                    Log Out
                </button>
                <button onClick={event =>  window.location = ("http://localhost:3003")}>Vote</button>
            </div>
    )
 )
}  


export default LogoutButton;