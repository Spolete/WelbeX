import React from 'react';
import './style.css';

const TableRow = ({product}) => {
    const {date, title, amount, distance} = product;
    return (
        <tr className='table__row'>
            <td className='table__cell'>{date}</td>
            <td className='table__cell'>{title}</td>
            <td className='table__cell'>{amount}</td>
            <td className='table__cell'>{distance}</td>
        </tr>
    );
};

export default TableRow;