import React from 'react';

const Pagination = ({postsPerPage, totalPosts, paginate, id}) => {

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

  let url = ("/forum/" + id + "&page=" )

    return (
        <nav>
            <div>pagination</div>
            <ul className={'pagination'}>
                {pageNumbers.map(number => (
                    <li key={number} className={'page-item'}>
                        <a onClick={() => paginate(number)} href={url + number} className={'page-link'}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;