import React, {useContext, useState} from 'react';
import mainContext from "../context/mainContext";
import SingleForumCard from "./SingleForumCard";
import SingleReply from "./SingleReply";

const UserProfileHeader = () => {

    const {user} = useContext(mainContext)
    const [getState, setState] = useState(1);

    function selectedTab(x) {
        setState(x)
    }
    return (
        <div className='user-profile-header'>
            <div className="d-flex j-space-btw">
                <div
                    className={getState === 1 ? "tabs color" : "tabs"}
                    onClick={() => selectedTab(1)}>
                    Created Forums
                </div>
                <div
                    className={getState === 2 ? "tabs color" : "tabs"}
                    onClick={() => selectedTab(2)}>
                    Replies
                </div>
            </div>
            <div>
                <div
                    className={getState === 1 ? "content d-block" : "content"}>
                    {/*<SingleForumCard />*/}
                </div>
                <div
                    className={getState === 2 ? "content d-block" : "content"}>
                    {/*<SingleReply/>*/}
                </div>
            </div>
        </div>
    );
};

export default UserProfileHeader;