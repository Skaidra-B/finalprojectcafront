import React, {useContext, useEffect, useRef, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import http from "../plugins/http";
import SingleReply from "./SingleReply";
import mainContext from "../context/mainContext";

const SingleForumView = () => {

    const {_id} = useParams()
    const [forum, setForum] = useState(null)

    const [status, setStatus] = useState(null)
    const {user} = useContext(mainContext);
    const textRef = useRef()

    useEffect(() => {
        http.get("/get-single-forum/"+_id).then(res => {
            if (res.success) {
                setForum(res.forum)
                // setPostsAmount(res.forum.posts.length)
                // console.log(res.forum)
                // console.log(res.forum.posts)
            }
        })

    }, [])

    async function postReply() {
        const newPost = {
            _id: forum._id,
            userId: user._id,
            username: user.username,
            text: textRef.current.value
        }
        const data = await http.post(newPost, "/reply-to-forum")
        console.log(data)
        if (data.success) {
            setStatus(null)

        } else {
            setStatus(data.message)
        }
    }

    return (

        <div>
            <div>
                {forum && <h3>Forum: {forum.title}</h3>}
                {user? <div>
                    <div>Your reply:</div>
                    <input type="text" ref={textRef}/>
                    <button onClick={postReply}>Post Reply</button>
                </div> : <div className={'d-flex'}>Login to reply
                    <Link to="/login">
                        <p>Login</p>
                    </Link>
                </div>}


                <div>{status}</div>
                {forum && forum.posts.length > 0 ?
                    <div> {forum.posts.map((post, i) => <SingleReply key={i} post={post}/>)} </div> :
                    <div>This forum has no posts...</div>
                }
            </div>
        </div>
    );
};

export default SingleForumView;