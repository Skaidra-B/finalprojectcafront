import React, {useContext, useRef, useState} from 'react';
import http from "../plugins/http";
import mainContext from "../context/mainContext"
import {Link} from "react-router-dom";


const Upload = () => {

    const {user, setShowUpload} = useContext(mainContext)
    const titleRef = useRef()
    const [status, setStatus] = useState(null)

    async function sendRequest() {
        const newForum = {
            ownerId: user._id,
            ownerImg: user.image,
            title: titleRef.current.value
        }
        const data = await http.post(newForum, "/upload")

        if (data.success) {
            setStatus(null)
            setShowUpload(false)
        } else {
            setStatus(data.message)
        }
    }

    return (
        <div>
            {user?
                <div>
                    <div>Start a new Forum</div>
                    <input type="text" ref={titleRef} placeholder="Enter forum title" className={'mt-1'} style={{width: "400px"}}/>
                    <div>{status}</div>
                    <div>
                        <button onClick={() => setShowUpload(false)} className={'reply-button me-3'}>Cancel</button>
                        <button onClick={sendRequest} className={'reply-button'}>Submit</button>
                    </div>
                </div> :
                <div className={'d-flex'}>
                    <div className={'me-1'}>Login to create new forum</div>
                    <Link to="/login" >
                        <div>Login</div>
                    </Link>
                </div>
            }
        </div>
    );
};

export default Upload;