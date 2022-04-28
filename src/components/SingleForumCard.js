import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom"

const SingleForumCard = ({forum}) => {

    const [postsAmount, setPostsAmount] = useState(0)

    const nav = useNavigate();
    // const navigateToSingleForum = () => {    //
    //     nav('/forum/' + forum._id);
    // }

    return (
        <div className={'single-forum-card'}>
            <div className={'d-flex'} onClick={() => nav(`/forum/${forum._id}`)}><h3>{forum.title}_</h3>by {forum.username}</div>
            {/*<Link to={`/forum/`+forum._id}><h3>{forum.title}_</h3>by {forum.username}</Link>*/}
            <div>Replies(0)</div>
            <div>heart</div>
        </div>
    );
};

export default SingleForumCard;