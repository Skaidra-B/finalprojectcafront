import React, {useContext, useState} from 'react';
import UserProfileHeader from "./UserProfileHeader";
import UserProfileSidebar from "./UserProfileSidebar";
import {Container} from "react-bootstrap";

const UserProfile = () => {

    return (
        <Container fluid="lg">
            <div className='d-flex sm-column'>
                <div className="d-flex grow1 j-center">
                    <UserProfileSidebar/>
                </div>
                <div className="d-flex grow2">
                    <UserProfileHeader/>
                </div>
            </div>
        </Container>
    );
};

export default UserProfile;