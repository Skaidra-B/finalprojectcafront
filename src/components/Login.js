import React, {useContext, useRef, useState} from 'react';
import http from "../plugins/http";
import mainContext from "../context/mainContext";
import {useNavigate} from "react-router-dom";
import {Container} from "react-bootstrap";

const Login = () => {

    const {setUser, setUserNotifications} = useContext(mainContext)

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
        if (data.success) {
            setUser(data.user)
            setStatus(null)
            setUserNotifications(data.user.notifications)
            nav("/")
            if (stayLoggedIn) return localStorage.setItem("stayLoggedIn", "true")

        } else {
            setStatus(data.message)
        }
    }
    return (
        <Container fluid="lg">
            <div className="auth">
                <div className="j-center d-flex">
                    <input type="text" ref={emailRef} placeholder="Email"/>
                </div>
                <div className="j-center d-flex">
                    <input type="text" ref={passwordRef} placeholder="Password"/>
                </div>
                <div className="j-center d-flex">
                    <label htmlFor="check2" className={'auto-login-label'}>Log me in automatically</label>
                    <input onChange={() => setStayLoggedIn(!stayLoggedIn)} type="checkbox" id="check2"/>
                </div>
                <div className="j-center d-flex">
                    <button onClick={auth} className={'auth-button'}>Login</button>
                </div>
                <div className="j-center d-flex">
                    <div>{status}</div>
                </div>
            </div>
        </Container>
    );
};


export default Login;