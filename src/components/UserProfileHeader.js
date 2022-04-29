import React, {useContext, useEffect, useState} from 'react';
import mainContext from "../context/mainContext";
import SingleForumCard from "./SingleForumCard";
import SingleReply from "./SingleReply";
import http from "../plugins/http";
import SingleReplyInUserAccount from "./SingleReplyInUserAccount";

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
                // console.log(uploadedForums)

                const uploadedPosts = await http.get('/get-posts/' + user?._id)
                if (uploadedPosts.success) setUserUploadedPosts(uploadedPosts.uploadedPosts)
                // console.log(uploadedPosts)
            }
        }
        getForums()

    }, [user])

    // console.log(user._id, typeof(user._id)) //626bb3b3232e1f4c9f099516 string
    // const userPosts = userUploadedPosts.map(x => x.posts)
    // console.log(userPosts)
    // console.log(userPosts[0])
    //
    // const userPostsOnly = userPosts[0].filter(x => x.posterId === user._id)
    // console.log(userPostsOnly)




    return (
        <div className='user-profile-header'>
            <div className="d-flex j-space-btw">
                <div
                    className={getState === 1 ? "tabs color" : "tabs"}
                    onClick={() => selectedTab(1)}>
                    Created Forums
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
                    {userUploadedForums.map((forum, i) => <SingleForumCard forum={forum} key={forum._id}/>)}
                </div>
                <div
                    className={getState === 2 ? "content d-block" : "content"}>
                    {userUploadedPosts.map((post, i) => <SingleReplyInUserAccount post={post} key={i}/>)}
                </div>
            </div>
        </div>
    );
};

export default UserProfileHeader;