import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom"
import mainContext from "../context/mainContext";
import {Container} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";

const SingleForumCard = ({forum}) => {

    // const [postsAmount, setPostsAmount] = useState(0)

    const {getFavorites, setFavoritesIds} = useContext(mainContext)
    const [getWatching, setWatching] = useState(false)

    useEffect(() => {
        const values = JSON.parse(localStorage.getItem('favorites'))
        if (values && values.includes(forum._id)) {
            return setWatching(true)
        } else {
            return setWatching(false)
        }
    }, [getFavorites])

    function addToFavorites() {
        const values = JSON.parse(localStorage.getItem('favorites'))
        if (values.includes(forum._id)) {
            const index = values.indexOf(forum._id)
            values.splice(index, 1)
        } else {
            values.push(forum._id)
        }
        localStorage.setItem('favorites', JSON.stringify(values));
        setFavoritesIds(values)
        setWatching(!getWatching)
    }

    const nav = useNavigate();

    // const navigateToSingleForum = () => {    //
    //     nav('/forum/' + forum._id);
    // }

    return (
        <Container className={'single-forum-card'}>
            <Row>
                <Col>
                    <img className={'userPhoto-for-card'} src={forum.creatorImg} alt=""/>
                </Col>
                <Col xs={8}>
                    <h3 onClick={() => nav(`/forum/${forum._id}`)} className={'pt-1'}>{forum.title}</h3>
                </Col>
                <Col className={'sm-d-none'}>
                    <p className={'pt-2'}>Replies ({forum.posts.length})</p>
                </Col>
                <Col>
                    <div className={'favorite-symbol pt-2'} onClick={addToFavorites}
                         style={{color: getWatching ? 'red' : 'lightgray'}}>♥
                    </div>
                </Col>
            </Row>
        </Container>
        // <div className={'single-forum-card'}>
        //     <img className={'userPhoto-for-card'} src={forum.creatorImg} alt=""/>
        //     <div className={'d-flex'} ><h3 onClick={() => nav(`/forum/${forum._id}`)}>{forum.title}_</h3>by {forum.username}</div>
        //     {/*<Link to={`/forum/`+forum._id}><h3>{forum.title}_</h3>by {forum.username}</Link>*/}
        //     <div>Replies(0)</div>
        //     <div className={'favorite-symbol'} onClick={addToFavorites} style={{color: getWatching ? 'red' : 'lightgray'}}>♥</div>
        // </div>
    );
};

export default SingleForumCard;