import React, {useContext, useEffect} from 'react';
import mainContext from "../context/mainContext";
import http from "../plugins/http";
import {Container} from "react-bootstrap";
import SingleForumCard from "./SingleForumCard";

const Favorites = () => {


    const {getFavorites, setFavorites, getFavoritesIds} = useContext(mainContext)

    useEffect( () => {
        async function favorites() {
            const allPostData = await http.get('/get-all-forums')
            if (allPostData.success) {
                const data = allPostData.allForums
                const keys = ["_id"]
                const values = await JSON.parse(localStorage.getItem('favorites'))
                if (values) {
                    const result = data.filter(function (e) {
                        return keys.every(function (a) {
                            return values.includes(e[a])
                        })
                    })
                    setFavorites(result)
                }
            }
        }
        favorites()
    }, [getFavoritesIds])

    return (
        <div>
            {
                getFavorites.length > 0 ? <div>
                    <Container className='d-flex column mt-5'>
                        {getFavorites.map((x, i) =>
                            <SingleForumCard key={i} forum={x}/>
                        )}
                    </Container>
                </div> : <div className="favStyle">
                    <Container
                               style={{display: "flex", width: "1000px", justifyContent: "center", marginRight: "10px"}}>
                        <div className='d-flex column mt-5'>
                            <div>You do not have favorite forums</div>
                        </div>
                    </Container>
                </div>
            }
        </div>
    );
};

export default Favorites;