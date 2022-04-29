import React, {useContext, useEffect, useRef, useState} from 'react';
import mainContext from "../context/mainContext";
import {Button, Modal} from "react-bootstrap";
import http from "../plugins/http";

const UserProfileSidebar = () => {

    // useEffect(() => {
    //
    // }, [user.image])

    const {setUser, setForums, user} = useContext(mainContext)

    const [showMessageModal, setShowMessageModal] = useState(false)
    const [status, setStatus] = useState(null)

    const pictureRef = useRef()

    const handleShowMessageModal = () => setShowMessageModal(true);
    const handleCloseMessageModal = () => setShowMessageModal(false);


    async function changePicture() {
        const picture = {
            userId: user._id,
            picture: pictureRef.current.value
        }
        const data = await http.post(picture, "/change-picture")
        // console.log(data)
        if (data.success) {
            setStatus(null)
            // setUser(data.refreshUsers)
            // setForums(data.refreshForums)
            setShowMessageModal(false)
        } else {
            setStatus(data.message)
        }

    }


    return (
        <div className={'user-profile-sidebar'}>
            <img className="userPhoto" src={user?.image} alt=""/>
            <p className="profile-username">{user?.username}</p>

            <button onClick={handleShowMessageModal}>Change profile picture</button>

            <Modal show={showMessageModal} onHide={handleCloseMessageModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Change you profile picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input ref={pictureRef} placeholder="Enter picture URL here"/>
                    <div>{status}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseMessageModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={changePicture}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default UserProfileSidebar;