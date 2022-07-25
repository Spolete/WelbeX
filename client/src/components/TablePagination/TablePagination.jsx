import React from 'react';
import cn from 'classnames'
import './style.css'

const TablePagination = ({totalPages, currentPage, setCurrentPage}) => {
    const pages = [];

    const createPages = (pages, totalPages, currentPage) => {
        if (totalPages > 10) {
            if (currentPage > 5) {
                for (let i = currentPage - 4; i <= currentPage + 5; i++) {
                    pages.push(i)
                    if (i === totalPages) break
                }
            } else {
                for (let i = 1; i <= 10; i++) {
                    pages.push(i)
                    if (i === totalPages) break
                }
            }
        } else {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        }
    }

    createPages(pages, totalPages, currentPage)

    return (
        <div className="table__pagination">
            {pages.map((page, index) =>
                <div
                    key={index}
                    className={cn('table__page', {table__page_active: currentPage === page})}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </div>)}
        </div>
    );
};

export default TablePagination;