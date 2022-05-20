import React, {useContext, useEffect, useState} from 'react';
import mainContext from "../context/mainContext";
import SingleForumCard from "./SingleForumCard";
import http from "../plugins/http";
import SingleReplyInUserAccount from "./SingleReplyInUserAccount";
import {Container} from "react-bootstrap";

const UserProfileHeader = () => {

    const {user} = useContext(mainContext)
    const [getState, setState] = useState(1)
    const [userUploadedForums, setUserUploadedForums] = useState([])
    const [userUploadedPosts, setUserUploadedPosts] = useState([])

    function selectedTab(x) {
        setState(x)
    }

    useEffect(() => {
        async function getForums() {
            if (user?._id) {
                const uploadedForums = await http.get('/get-uploaded-forums/' + user?._id)
                if (uploadedForums.success) setUserUploadedForums(uploadedForums.uploadedForums)

                const uploadedPosts = await http.get('/get-posts/' + user?._id)
                if (uploadedPosts.success) setUserUploadedPosts(uploadedPosts.uploadedPosts)
            }
        }
        getForums()

    }, [user])


    return (
        <Container fluid="lg pb-5">
            <div className='user-profile-header'>
                <div     className="d-flex j-space-btw">
                    <div
                        className={getState === 1 ? "tabs color" : "tabs"}
                        onClick={() => selectedTab(1)}>
                        Created Forums ({userUploadedForums.length})
                    </div>
                    <div
                        className={getState === 2 ? "tabs color" : "tabs"}
                        onClick={() => selectedTab(2)}>
                        Replies
                    </div>
                </div>
                <div>
                    <div
                        className={getState === 1 ? "content d-block" : "content"}>
                        {userUploadedForums.map((forum, i) => <SingleForumCard forum={forum} key={forum._id}/>).reverse()}
                    </div>
                    <div
                        className={getState === 2 ? "content d-block" : "content"}>
                        {userUploadedPosts.map((post, i) => <SingleReplyInUserAccount post={post} key={i} index={i}/>).reverse()}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default UserProfileHeader;