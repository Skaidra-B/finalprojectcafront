import React, {useContext} from 'react';
import mainContext from "../context/mainContext";

const SingleReply = ({post}) => {

    const {setUser, user} = useContext(mainContext)

    return (
        <div className={'reply-card'}>
            <div>{post.username}</div>
            <div>{new Date(post.time).toLocaleDateString("lt-LT")} {new Date(post.time).toLocaleTimeString("lt-LT")}</div>

            <img className={'userPhoto-for-card'} src={post.posterImg} alt=""/>
            <div>{post.text}</div>
        </div>
    );
};

export default SingleReply;