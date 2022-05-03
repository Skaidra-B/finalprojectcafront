import React, {useContext, useEffect} from 'react';
import mainContext from "../context/mainContext";

const SingleReplyInUserAccount = ({post, index}) => {

    const {user} = useContext(mainContext)

    const userPostsOnly = post.posts.filter(x => x.posterId === user._id)

    let posttexts = []

    for (let a in userPostsOnly) {
        posttexts.push(userPostsOnly[a].text)
    }

    for (let element in posttexts) {
        posttexts[element] = posttexts[element].split(' ')
    }

    let embedids = {
        videos: [],
        pictures: []
    }


    function matchYoutubeUrl(url) {
        let p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if(url.match(p)){
            return url.match(p)[1];
        }
        return false;
    }

    function matchPicUrl(picUrl) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(picUrl);
    }

    function genemberid (posttexts) {
        for (let i in posttexts) {
            for (let x in posttexts[i]) {
                if (matchYoutubeUrl(posttexts[i][x])) {
                    embedids.videos[i] = matchYoutubeUrl(posttexts[i][x])
                }
                if (matchPicUrl(posttexts[i][x])) {
                    embedids.pictures[i] = posttexts[i][x]
                }
            }
        }
    }

    genemberid(posttexts)


    return (
        <div className={'single-reply-in-user-account'}>
            <div><b>{post.title}</b> created by {post.username} on {new Date(post.time).toLocaleDateString("lt-LT")} {new Date(post.time).toLocaleTimeString("lt-LT")}</div>
            <hr/>
            {userPostsOnly.map((x, i) => <div  key={i}>
                <div className={'posts-title'}>{x.username} replied on {new Date(x.time).toLocaleDateString("lt-LT")} {new Date(x.time).toLocaleTimeString("lt-LT")}</div>
                <div className={'mb-4'}>{x.text}</div>

                {embedids.videos[i] !== undefined &&
                    <iframe
                        width="400"
                        height="300"
                        src={`https://www.youtube.com/embed/${embedids.videos[i]}`}
                        frameBorder="0"
                        // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        // title="Embedded youtube"
                    />
                }
                {embedids.pictures[i] !== undefined &&
                    <img width="300" height="200" src={embedids.pictures[i]} alt=""/>
                }
            </div>).reverse()}
        </div>
    );
};

export default SingleReplyInUserAccount;