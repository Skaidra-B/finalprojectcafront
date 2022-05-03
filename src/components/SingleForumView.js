import React, {useContext, useEffect, useRef, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import http from "../plugins/http";
import SingleReply from "./SingleReply";
import mainContext from "../context/mainContext";
import {Container} from "react-bootstrap";
import PostsMapping from "./PostsMapping";

// import io from "socket.io-client";
// const socket = io.connect("http://localhost:4000")

const SingleForumView = () => {

    const {_id} = useParams()
    const [forum, setForum] = useState(null)
    const [status, setStatus] = useState(null)
    const {user} = useContext(mainContext);
    const textRef = useRef()

    // SOCKET
    // const [getItem, setItem] = useState()
    // const [getPost, setPost] = useState("")
    // const idArr = _id.split('-')
    // const splitId = idArr[idArr.length - 1]

    // PAGINATION
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setsPostPerPage] = useState(10)
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const totalPosts = forum?.posts.length

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    const paginate = pageNumber => setCurrentPage(pageNumber)

    let url = ("/forum/" + forum?._id + "/" )

    function checkIfForum() {
        if (forum) {
            return forum.posts.slice(indexOfFirstPost, indexOfLastPost)
        } else {
            return forum.posts
        }
    }


    useEffect(() => {
        http.get("/get-single-forum/" + _id).then(res => {
            if (res.success) {
                setForum(res.forum)
            }
        })
    }, [])

    // // Fetch Single Product //
    // async function getSingleForum() {
    //     const data = await http.get("/get-single-forum/" + splitId)
    //     if (data.success) {
    //         return setItem(data.forum)
    //     }
    // }
    // useEffect(() => {
    //     socket.emit("join_auction", splitId)
    //     return getSingleForum()
    // }, [])
    //
    // useEffect(() => {
    //     return getSingleForum();
    // }, [_id]);

    // useEffect(() => {
    //     socket.on("update_product", (data) => {
    //         console.log(data[0])
    //         setItem(data[0])
    //         setPost(data[0].posts)
    //     })
    // }, [socket])


    async function postReply() {
        const newPost = {
            _id: forum._id,
            posterId: user._id,
            posterImg: user.image,
            username: user.username,
            text: textRef.current.value
        }
        const data = await http.post(newPost, "/reply-to-forum")
        if (data.success) {
            setStatus(null)
            textRef.current.value = ""
        } else {
            setStatus(data.message)
        }
        // await socket.emit("new_post", newPost)
    }


    return (
        <Container className={'pb-5'}>
            <div>
                {forum && <h3>{forum.title}</h3>}
                {user ?
                    <div className={'d-flex column'}>
                        <div>Your reply:</div>
                        <textarea type="text" rows="2" cols="100" ref={textRef}/>
                        <button onClick={postReply} className={'reply-button'}>Post Reply</button>
                    </div>
                    : <div className={'d-flex'}>Login to reply
                        <Link to="/login">
                            <p>Login</p>
                        </Link>
                    </div>}
                <div>{status}</div>


                <nav>
                    <ul className={'pagination'}>
                        {pageNumbers.map(number => (
                            <li key={number} className={'page-item'}>
                                <a onClick={() => paginate(number)} href={url + number} className={'page-link'}>{number}</a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/*{forum && forum.posts.length > 0 ?*/}
                {/*    <div>*/}
                {/*        {checkIfForum().map((post, i) => <SingleReply key={i} post={post}/>).reverse()}*/}
                {/*    </div> :*/}
                {/*    <div>This forum has no posts...</div>*/}
                {/*}*/}

                <PostsMapping forum={forum} checkIfForum={checkIfForum}/>
            </div>
        </Container>
    );
};

export default SingleForumView;