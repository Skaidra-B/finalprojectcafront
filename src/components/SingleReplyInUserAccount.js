import React, {useContext} from 'react';
import mainContext from "../context/mainContext";

const SingleReplyInUserAccount = ({post}) => {

    const {user} = useContext(mainContext)

    const userPostsOnly = post.posts.filter(x => x.posterId === user._id)
    // console.log(userPostsOnly)

    return (
        <div className={'single-reply-in-user-account'}>
            <div>Forum <b>{post.title}</b> created by {post.username} on {new Date(post.time).toLocaleDateString("lt-LT")} {new Date(post.time).toLocaleTimeString("lt-LT")}</div>
            {userPostsOnly.map((x, i) => <div >
                <hr/>
                <div>{x.username} replied on {new Date(x.time).toLocaleDateString("lt-LT")} {new Date(x.time).toLocaleTimeString("lt-LT")}</div>
                <div>{x.text}</div>
                <hr/>
            </div>).reverse()}
        </div>
    );
};

export default SingleReplyInUserAccount;