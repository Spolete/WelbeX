import React from 'react';

const TableButton = ({onClick}) => {
    return (
        <button onClick={onClick}>
            Фильтровать
        </button>
    );
};

export default TableButton;