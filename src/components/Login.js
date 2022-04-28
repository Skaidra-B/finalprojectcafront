import React, {useContext, useRef, useState} from 'react';
import http from "../plugins/http";
import mainContext from "../context/mainContext";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const {setUser} = useContext(mainContext)

    const emailRef = useRef()
    const passwordRef = useRef()

    const [status, setStatus] = useState(null)

    const [stayLoggedIn, setStayLoggedIn] = useState(false)
    const nav = useNavigate()

    async function auth() {
        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            stayLoggedIn
        }
        const data = await http.post(user, "/login")
        console.log(data)
        if (data.success) {
            setUser(data.user)
            setStatus(null)
            nav("/")
            if (stayLoggedIn) return localStorage.setItem("stayLoggedIn", "true")
            console.log(data.user.username)
        } else {
            setStatus(data.message)
        }
    }
    return (
        <div className="d-flex column">
            <div className="j-center d-flex">
                <input type="text" ref={emailRef} placeholder="email"/>
            </div>
            <div className="j-center d-flex">
                <input type="text" ref={passwordRef} placeholder="password"/>
            </div>
            <div className="j-center d-flex">
                <label htmlFor="check2">Log me in automatically</label>
                <input onChange={() => setStayLoggedIn(!stayLoggedIn)} type="checkbox" id="check2"/>
            </div>
            <div className="j-center d-flex">
                <button onClick={auth}>Login</button>
            </div>
            <div className="j-center d-flex">
                <div>{status}</div>
            </div>
        </div>
    );
};


export default Login;