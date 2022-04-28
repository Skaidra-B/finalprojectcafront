import React, {useContext, useState} from 'react';
import mainContext from "../context/mainContext";
import {Modal} from "react-bootstrap";

const UserProfileSidebar = () => {

    const {user} = useContext(mainContext)


    return (
        <div className={'user-profile-sidebar'}>
            <img className="userPhoto" src={user?.image} alt=""/>
            <p className="profile-username">{user?.username}</p>
            <div>Change profile picture</div>
        </div>
    );
};

export default UserProfileSidebar;