import React, {useContext, useState} from 'react';
import UserProfileHeader from "./UserProfileHeader";
import UserProfileSidebar from "./UserProfileSidebar";

const UserProfile = () => {

    return (
        <div className='d-flex'>
            <div className="d-flex grow1 j-center">
                <UserProfileSidebar/>
            </div>
            <div className="d-flex grow2">
                <UserProfileHeader/>
            </div>
        </div>
    );
};

export default UserProfile;