import React, {useContext, useEffect, useState} from 'react';
import SingleForumCard from "../components/SingleForumCard";
import http from "../plugins/http";
import mainContext from "../context/mainContext";

const IndexPage = () => {

    const {setFavorites, getForums, setForums} = useContext(mainContext)

   useEffect(() => {
       async function checkscheme() {
           const allPostData = await http.get('/get-all-forums')
           if (allPostData.success) setForums(allPostData.allForums)

           // console.log(allPostData)
       }
       checkscheme();
   }, [])

    //useEffect(async () => {
    //    const allPostData = await http.get('/get-all-forums')
    //    if (allPostData.success) setForums(allPostData.allForums)
    //    console.log(allPostData)
    //}, [])

    return (
        <div>
            {getForums.map((forum, i) =>  <SingleForumCard key={i} forum={forum}/>).reverse()}
        </div>
    );
};

export default IndexPage;