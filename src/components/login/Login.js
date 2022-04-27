import React, {useContext, useRef, useState} from 'react';
import http from "../../plugins/http";
// import mainContext from "../context/mainContext";

const Login = () => {

    // const {setLogged} = useContext(mainContext)

    const emailRef = useRef()
    const passwordRef = useRef()

    const [error, setError] = useState(null)
    const [trigger, setTrigger] = useState(false)

    async function auth() {
        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            stayLogged: trigger
        }
        const data = await http.post(user, "/login")
        console.log(data)
        if (data.success) {
            // setLogged(data.user)
            // // console.log(data.user)
            // localStorage.setItem('isLogged', data.user.stayLogged)
            // localStorage.setItem('email', data.user.email)
            setError(null)
        } else {
            setError(data.message)
            // setLogged(null)
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
                <label htmlFor="check2">Stay logged in</label>
                <input onChange={() => setTrigger(!trigger)} type="checkbox" id="check2"/>
            </div>
            <div className="j-center d-flex">
                <button onClick={auth}>Login</button>
            </div>
            {error && <div>{error}</div>}
        </div>
    );
};


export default Login;