import React, {useContext} from 'react';
import mainContext from "../context/mainContext";


const SingleReply = ({post}) => {

    let embedId
    let pic

    let arr = post.text.split(' ')

    function matchYoutubeUrl(url) {
        let p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if(url.match(p)){
            return url.match(p)[1];
        }
        return false;
    }

    let i
    for (i in arr) {
        let url = matchYoutubeUrl(arr[i])
        if (url) {
            embedId = url
        }
    }

    function matchPicUrl(picUrl) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(picUrl);
    }

    let x
    for (x in arr) {
        let url = matchPicUrl(arr[x])
        if (url) {
            pic = arr[x]
        }
    }

    return (
        <div className={'reply-card'}>
            <h5 className={'ms-4'}>{post.username}</h5>
            <div >{new Date(post.time).toLocaleDateString("lt-LT")} {new Date(post.time).toLocaleTimeString("lt-LT")}</div>
            <img className={'userPhoto-for-card ms-4'} src={post.posterImg} alt=""/>
            <div>
                <div>{post.text}</div>
                {embedId !== undefined &&
                    <iframe
                        width="400"
                        height="300"
                        src={`https://www.youtube.com/embed/${embedId}`}
                        frameBorder="0"
                        // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        // title="Embedded youtube"
                    />
                }
                {pic &&
                    <img width="300" height="200" src={pic} alt=""/>
                }
            </div>
        </div>
    );
};

export default SingleReply;