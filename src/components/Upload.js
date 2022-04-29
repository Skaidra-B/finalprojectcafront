import React, {useContext, useRef, useState} from 'react';
import http from "../plugins/http";
import mainContext from "../context/mainContext"
import {useNavigate} from "react-router-dom";

const Upload = () => {

    const {user} = useContext(mainContext)
    const nav = useNavigate()
    const titleRef = useRef()
    // const textRef = useRef()
    const [status, setStatus] = useState(null)


    async function sendRequest() {
        const newForum = {
            ownerId: user._id,
            ownerImg: user.image,
            title: titleRef.current.value
        }
        const data = await http.post(newForum, "/upload")
        // console.log(data)
        if (data.success) {
            setStatus(null)
            nav("/")
        } else {
            setStatus(data.message)

        }
    }

    return (
        <div>
            <div>Post a new Forum</div>
            <div>Title:</div>
            <input type="text" ref={titleRef}/>
            {/*<div>Text:</div>*/}
            {/*<textarea name="" id="" cols="30" rows="10" ref={textRef}/>*/}
            <div>{status}</div>
            <button onClick={sendRequest}>Submit</button>
        </div>
    );
};

export default Upload;