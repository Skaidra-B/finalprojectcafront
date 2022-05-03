import React, {useRef, useState} from 'react';
import http from "../plugins/http";
import {Container} from "react-bootstrap";

const Register = () => {
    const usernameRef = useRef()
    const emailRef = useRef()
    const pass1Ref = useRef()
    const pass2Ref = useRef()
    const [status, setStatus] = useState(null)


    async function auth() {
        const user = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            passOne: pass1Ref.current.value,
            passTwo: pass2Ref.current.value,
        }
        const data = await http.post(user, "/register")
        if(!data.success) {
            setStatus(data.error)
        } else {
            setStatus(data.message)
            // console.log(data)
        }
    }

    return (
        <Container fluid="lg">
            <div className="auth">
                <div className="j-center d-flex">
                    <input type="text" ref={usernameRef} placeholder="Username"/>
                </div>
                <div className="j-center d-flex">
                    <input type="text" ref={emailRef} placeholder="Email"/>
                </div>
                <div className="j-center d-flex">
                    <input type="text" ref={pass1Ref} placeholder="Password"/>
                </div>
                <div className="j-center d-flex">
                    <input type="text" ref={pass2Ref} placeholder="Confirm password"/>
                </div>
                <div className="j-center d-flex">
                    <button onClick={auth} className={'auth-button'}>Register</button>
                </div>
                <div className="j-center d-flex">
                    <div>{status}</div>
                </div>
            </div>
        </Container>
    );
};

export default Register;