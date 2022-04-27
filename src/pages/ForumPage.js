import React from 'react';
import SingleForumView from "../components/singleForum/SingleForumView";
import UserResponse from "../components/userResponse/UserResponse";

const ForumPage = () => {
    return (
        <div>
            <UserResponse/>
            <SingleForumView/>
        </div>
    );
};

export default ForumPage;