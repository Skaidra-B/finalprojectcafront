import React, {useContext} from 'react';
import mainContext from "../context/mainContext";
import {useNavigate} from "react-router-dom";
import http from "../plugins/http";

const Notifications = ({notification}) => {

    const {getForums, userNotifications, setUserNotifications, user} = useContext(mainContext);
    const particularForum = getForums.find(x => x.title === notification.forumTitle)
    const nav = useNavigate()
    const forumId = particularForum._id

    async function deleteNotification() {
        const notificationDeleted = await http.get('/delete-notification/'+ notification._id)
        console.log(notificationDeleted)
        if (notificationDeleted.success) {
            userNotifications.filter((x => x._id !== notification._id))
            setUserNotifications([...userNotifications])
        }
    }

    return (
        <div className={'notification'}>
            {user.username !== notification.replierUsername ?
                <p>{notification.replierUsername} replied in your forum "{notification.forumTitle}"</p> :
                <p>You replied in your forum "{notification.forumTitle}"</p>
            }
            <div className={'d-flex space-b'}>
                <button onClick={() => nav(`/forum/${forumId}`)}>See</button>
                <button onClick={deleteNotification}>Clear</button>
            </div>
            <hr/>
        </div>
    );
};

export default Notifications;