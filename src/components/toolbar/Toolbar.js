import React from 'react';
import "./style.css";

import {Link, useNavigate} from "react-router-dom";

const Toolbar = () => {
    const nav = useNavigate()
    return (
        <div>
            <div>SIMPLE Forum</div>
            <div className={'d-flex'}>
                <Link to="/register">
                    <p >Register</p>
                </Link>
                <Link to="/login">
                    <p >Login</p>
                </Link>
                <Link to="/upload">
                    <p >Create Forum</p>
                </Link>
                <Link to="/profile">
                    <p >My account</p>
                </Link>
            </div>
        </div>
    );
};

export default Toolbar;