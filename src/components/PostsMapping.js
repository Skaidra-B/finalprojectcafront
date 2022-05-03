import React from 'react';
import SingleReply from "./SingleReply";

const PostsMapping = ({forum, checkIfForum}) => {
    return (
        <div>
            {forum && forum.posts.length > 0 ?
                <div>
                    {checkIfForum().map((post, i) => <SingleReply key={i} post={post}/>).reverse()}
                </div> :
                <div>This forum has no posts...</div>
            }
        </div>
    );
};

export default PostsMapping;