import React, {useContext, useEffect} from 'react';
import SingleForumCard from "../components/SingleForumCard";
import http from "../plugins/http";
import mainContext from "../context/mainContext";
import {Container} from "react-bootstrap";
import Upload from "../components/Upload";

const IndexPage = () => {

    const {getForums, setForums, showUpload} = useContext(mainContext)

    useEffect(() => {
        async function checkscheme() {
            const allPostData = await http.get('/get-all-forums')
            if (allPostData.success) setForums(allPostData.allForums)

        }

        checkscheme();
    }, [])

    useEffect(() => {

    }, [getForums])


    return (

        <Container fluid="lg pb-5">
            {showUpload && <Upload/>}
            {getForums.map((forum, i) => <SingleForumCard key={i} forum={forum}/>).reverse()}
        </Container>
    );
};

export default IndexPage;