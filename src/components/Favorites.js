import React, {useContext, useEffect} from 'react';
import mainContext from "../context/mainContext";
import http from "../plugins/http";

const Favorites = () => {


    const {getFavorites, setFavorites, getFavoritesIds} = useContext(mainContext)

    // useEffect(async () => {
    //     const allPostData = await http.get('/get-all-posts')
    //     if (allPostData.success) {
    //         const data = allPostData.allPosts
    //         const keys = ["_id"]
    //         const values = await JSON.parse(localStorage.getItem('favorites'))
    //         if (values) {
    //             const result = data.filter(function (e) {
    //                 return keys.every(function (a) {
    //                     return values.includes(e[a])
    //                 })
    //             })
    //             setFavorites(result)
    //         }
    //     }
    // }, [getFavoritesIds])

    return (
        <div>

        </div>
    );
};

export default Favorites;