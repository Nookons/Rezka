import React from 'react';
import styles from './FeedbackScreen.module.css'

const Pagination = ({ commentsPerPage, totalComments, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalComments / commentsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className={styles.Pagination}>
            {pageNumbers.map(number => (
                <li onClick={() => paginate(number)} key={number} className={styles.PaginationButton} style={{backgroundColor: currentPage === number ? '#2d2d2d' : null }}>
                    <a>{number}</a>
                </li>
            ))}
        </ul>
    );
};

export default Pagination;