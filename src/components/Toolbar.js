import React, {useContext, useState} from 'react';

import mainContext from "../context/mainContext";
import {Link, useNavigate} from "react-router-dom";
import http from "../plugins/http";

const Toolbar = () => {


    const {user, setUser} = useContext(mainContext);
    const [getCount, setCount] = useState(0);
    const nav = useNavigate()

    function sendRequest() {
        http.get("/logout").then((res) => {
            if (res.success) {
                localStorage.removeItem("stayLoggedIn");
                setUser(null);
            }
            nav("/")
        });
    }

    return (
        <div className={'d-flex space-b'}>
            <div>
                <Link to="/"><div>SIMPLE Forum</div></Link>
                {user && <h5>Logged in as {user.username}</h5>}
            </div>
            <div className={'d-flex'}>
                {!user && <div className={'d-flex'}>
                    <Link to="/register">
                        <p>Register</p>
                    </Link>
                    <Link to="/login">
                        <p>Login</p>
                    </Link>
                </div>}
                {user && <div className={'d-flex'}>
                    <Link to="/upload">
                        <p>Create Forum</p>
                    </Link>
                    <Link to="/profile">
                        <p>My account</p>
                    </Link>
                    <button onClick={sendRequest}>Logout</button>
                </div>}
                <Link to="/favorites">
                    <p>Favorites ({getCount})</p>
                </Link>
            </div>
        </div>
    );
};

export default Toolbar;