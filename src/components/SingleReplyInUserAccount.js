import React, {useContext, useEffect} from 'react';
import mainContext from "../context/mainContext";

const SingleReplyInUserAccount = ({post}) => {

    const {user} = useContext(mainContext)

    const userPostsOnly = post.posts.filter(x => x.posterId === user._id)


    let embedId2
    let pic

    let arr = []
    for (i in arr) {
        arr = post.posts[i].text.split(' ')
    }


    // let arr = post.posts[0].text.split(' ')

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
            embedId2 = url
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

    // console.log(userPostsOnly)

    return (
        <div className={'single-reply-in-user-account'}>
            <div><b>{post.title}</b> created by {post.username} on {new Date(post.time).toLocaleDateString("lt-LT")} {new Date(post.time).toLocaleTimeString("lt-LT")}</div>
            <hr/>
            {userPostsOnly.map((x, i) => <div key={i} >
                <div>{x.username} replied on {new Date(x.time).toLocaleDateString("lt-LT")} {new Date(x.time).toLocaleTimeString("lt-LT")}</div>
                <div className={'mb-4'}>{x.text}</div>

                {embedId2 !== undefined &&
                    <iframe
                        width="400"
                        height="300"
                        src={`https://www.youtube.com/embed/${embedId2}`}
                        frameBorder="0"
                        // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        // title="Embedded youtube"
                    />
                }
                {pic &&
                    <img width="300" height="200" src={pic} alt=""/>
                }
            </div>).reverse()}
        </div>
    );
};

export default SingleReplyInUserAccount;