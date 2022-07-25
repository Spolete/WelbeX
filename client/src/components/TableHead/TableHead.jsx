import React from 'react';
import './style.css';

const TableHead = ({headers, sortValue, setSortValue, selectedSort, setSelectedSort}) => {

        const sortProducts = (event) => {
            if (sortValue !== event.target.dataset.value) {
                setSortValue(event.target.dataset.value)
                setSelectedSort(true)
            } else {
                setSortValue(event.target.dataset.value)
                setSelectedSort(!selectedSort)
            }
        }

        return (
            <thead className='table__header'>
            <tr>
                {headers.map((header, i) => (
                    <th
                        onClick={sortProducts}
                        data-value={header.value}
                        key={i} className='table__th'
                    >
                        {header.title}
                    </th>
                ))}
            </tr>
            </thead>);
    }
;

export default TableHead;