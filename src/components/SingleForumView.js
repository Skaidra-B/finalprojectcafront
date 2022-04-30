import React, {useContext, useEffect, useRef, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import http from "../plugins/http";
import SingleReply from "./SingleReply";
import mainContext from "../context/mainContext";
import Pagination from "./Pagination";

const SingleForumView = () => {

    const {_id} = useParams()
    const [forum, setForum] = useState(null)

    const [status, setStatus] = useState(null)
    const {user} = useContext(mainContext);
    const textRef = useRef()

    // mano posts = forum.posts array

    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setsPostPerPage] = useState(5)
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage


    useEffect(() => {
        http.get("/get-single-forum/"+_id).then(res => {
            // http.get(`/get-single-forum/${_id}/${currentPage}`)
            if (res.success) {
                setForum(res.forum)
                // setPostsAmount(res.forum.posts.length)
                // console.log(res.forum)
                // console.log(res.forum.posts)
            }
        })

    }, [])

    function checkIfForum() {
        if (forum) {
            return forum.posts.slice(indexOfFirstPost, indexOfLastPost)
        } else {
            return forum.posts
        }
    }

    // console.log(checkIfForum())

    const paginate = pageNumber => setCurrentPage(pageNumber)


    async function postReply() {
        const newPost = {
            _id: forum._id,
            posterId: user._id,
            posterImg: user.image,
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

                <Pagination postsPerPage={postsPerPage} totalPosts={forum?.posts.length} paginate={paginate} id={forum?._id}/>

                {forum && forum.posts.length > 0 ?
                    <div>
                        {checkIfForum().map((post, i) => <SingleReply key={i} post={post}/>).reverse()}
                    </div> :
                    <div>This forum has no posts...</div>
                }
            </div>
        </div>
    );
};

export default SingleForumView;