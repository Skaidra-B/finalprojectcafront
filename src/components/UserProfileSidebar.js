import React, {useContext, useRef, useState} from 'react';
import mainContext from "../context/mainContext";
import {Button, Container, Modal} from "react-bootstrap";
import http from "../plugins/http";

const UserProfileSidebar = () => {

    const {user} = useContext(mainContext)

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
        if (data.success) {
            setStatus(null)
            setShowMessageModal(false)
        } else {
            setStatus(data.message)
        }
    }


    return (
        <Container>
            <div className={'user-profile-sidebar mb-3'}>
                <img className="userPhoto" src={user?.image} alt=""/>
                <h5 className="mt-4 mb-4">{user?.username}</h5>

                <button onClick={handleShowMessageModal} style={{backgroundColor: '#B9D9EB'}}>Change profile picture</button>

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
        </Container>
    );
};

export default UserProfileSidebar;