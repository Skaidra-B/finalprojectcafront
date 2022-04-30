import React, {useContext} from 'react';
import mainContext from "../context/mainContext";

const SingleReply = ({post}) => {

    const {setUser, user} = useContext(mainContext)

    const textToCheck = post.text

    function textCheck({textToCheck}) {
        if (textToCheck.includes("https://www.youtube.com")) {
            const link = textToCheck
            return '<iframe width="420" height="345" src={link}</iframe>'
        }

    }

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