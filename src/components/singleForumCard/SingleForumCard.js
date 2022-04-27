import React from 'react';
import {useNavigate} from "react-router-dom";

const SingleForumCard = ({forum}) => {

    const nav = useNavigate();
    const navigateToSingleForum = () => {
        // const id = forum.titleRoute + forum._id
        // nav('/forum/' + forum._id);
    }

    return (
        <div>
            <div onClick={navigateToSingleForum}>Postas:</div>
            <div>by useris</div>
            <div>on 2022-04-27 08:13</div>
            <div>to favorites?</div>
        </div>
    );
};

export default SingleForumCard;