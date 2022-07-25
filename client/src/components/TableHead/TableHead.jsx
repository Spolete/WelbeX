import React from 'react';
import './style.css';

const TableHead = ({headers, sortProducts}) => {
    return (
        <thead className='table__header'>
        <tr>
            {headers.map((header, i) => (
                <th
                    onClick={(event) => sortProducts(event.target.dataset.value)}
                    data-value={header.value}
                    key={i} className='table__th'
                >
                    {header.title}
                </th>
            ))}
        </tr>
        </thead>);
};

export default TableHead;