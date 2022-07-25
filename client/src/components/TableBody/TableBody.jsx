import React from 'react';
import './style.css';
import TableRow from "../TableRow/TableRow";


const TableBody = ({products}) => {
    return (
        <tbody>
        {products.map(product =>
            <TableRow
                key={product.id}
                product={product}
            />
        )}
        </tbody>
    );
};

export default TableBody;