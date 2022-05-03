import React, {useContext, useEffect, useState} from 'react';
import mainContext from "../context/mainContext";
import {Link, useNavigate} from "react-router-dom";
import http from "../plugins/http";
import {Container} from "react-bootstrap";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { BsFillEnvelopeOpenFill } from "react-icons/bs";
import Notifications from "./Notifications";

const Toolbar = () => {

    const {user, setUser, showUpload, setShowUpload, getFavoritesIds, userNotifications} = useContext(mainContext);
    const [getCount, setCount] = useState(0);
    const nav = useNavigate()
    const [showNots, setShowNots] = useState(false)

    useEffect(() => {
        const values = JSON.parse(localStorage.getItem("favorites"));
        if (values) {
            setCount(values.length);
        }
    }, [getFavoritesIds]);


    function sendRequest() {
        http.get("/logout").then((res) => {
            if (res.success) {
                localStorage.removeItem("stayLoggedIn");
                setUser(null);
            }
            nav("/")
        });
    }

    function showNotifications() {
        setShowNots(!showNots)
    }

    return (
        <Container fluid="lg">
            <div className={'d-flex space-b toolbar'}>
                <div>
                    <Link to="/" className={'forum'}><h3>SIMPLE Forum</h3></Link>
                    {user ? <p>Logged in as {user.username}</p> : <p/>}
                </div>
                <div className={'d-flex'}>
                    {!user && <div className={'d-flex'}>
                        <Link to="/register" className={'toolbar-link'}>
                            <h5 >Register</h5>
                        </Link>
                        <Link to="/login" className={'toolbar-link'}>
                            <h5>Login</h5>
                        </Link>
                        <Link to="/favorites" className={'toolbar-link'}>
                            <h5>Favorites ({getCount})</h5>
                        </Link>
                    </div>}
                    {user && <div className={'d-flex'}>
                        <Link to="/" className={'toolbar-link'} onClick={() => setShowUpload(true)}>
                            <h5>Create Forum</h5>
                        </Link>
                        <Link to="/profile" className={'toolbar-link'}>
                            <h5>My account</h5>
                        </Link>
                        <Link to="/favorites" className={'toolbar-link'}>
                            <h5>Favorites ({getCount})</h5>
                        </Link>

                        {showNots? <h5 className={'notification'}><BsFillEnvelopeOpenFill className={'icon'} onClick={showNotifications}/>({userNotifications.length})</h5> : <h5 className={'notification'}><BsFillEnvelopeFill className={'icon'} onClick={() =>setShowNots(!showNots)}/>({userNotifications.length})</h5>}
                        {showNots &&
                            <div className={'notification-card'}>
                            {userNotifications.length > 0?
                                <div>
                                    {userNotifications.map((notification, i) => <Notifications key={i} notification={notification}/>)}
                                </div> : <p>You don't have notifications</p>}
                        </div>}
                        <button onClick={sendRequest} className={'log-out-button'}>Logout</button>
                    </div>}
                </div>
            </div>
        </Container>
    );
};

export default Toolbar;