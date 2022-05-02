import React, {useState} from 'react';
import SingleReply from "./SingleReply";

const Pagination = ({forum, postsPerPage, totalPosts}) => {

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    const [currentPage, setCurrentPage] = useState(1)
    // const [postsPerPage, setsPostPerPage] = useState(5)
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage

    const paginate = pageNumber => setCurrentPage(pageNumber)

  let url = ("/forum/" + forum?._id + "/" )

    function checkIfForum() {
        if (forum) {
            return forum.posts.slice(indexOfFirstPost, indexOfLastPost)
        } else {
            return forum.posts
        }
    }

    return (
        <div>
            <nav>

                <ul className={'pagination'}>
                    {pageNumbers.map(number => (
                        <li key={number} className={'page-item'}>
                            <a onClick={() => paginate(number)} href={url + number} className={'page-link'}>{number}</a>
                        </li>
                    ))}
                </ul>
            </nav>
            {forum && forum.posts.length > 0 ?
                <div>
                    {checkIfForum().map((post, i) => <SingleReply key={i} post={post}/>).reverse()}
                </div> :
                <div>This forum has no posts...</div>
            }
        </div>

    );
};

export default Pagination;