import React from 'react';

const SingleReply = ({post}) => {
    return (
        <div className={'reply-card'}>
            <div>{post.username}</div>
            <div>{new Date(post.time).toLocaleDateString("lt-LT")} {new Date(post.time).toLocaleTimeString("lt-LT")}</div>
            <div></div>
            <div>{post.text}</div>
        </div>
    );
};

export default SingleReply;