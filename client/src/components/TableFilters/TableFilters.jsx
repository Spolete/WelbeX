import React from 'react';
import './style.css';
import TableSelect from "./Components/TableSelect/TableSelect";

const TableFilters = (
    {
        selectedSort,
        setSelectedSort,
        selectedSortValue,
        setSelectedSortValue,
        searchQuery,
        setSearchQuery,
    }) => {
    return (
        <div className='table__filters'>
            <div className='table__selectors'>
                <TableSelect
                    setFilter={setSelectedSort}
                    name='filters'
                    value={selectedSort}
                    defaultValue="Фильтрация по"
                    options={[
                        {value: 'title', name: 'По названию'},
                        {value: 'amount', name: 'По количеству'},
                        {value: 'distance', name: 'По расстоянию'}
                    ]}
                />
                <TableSelect
                    setFilter={setSelectedSortValue}
                    name='values'
                    value={selectedSortValue}
                    defaultValue="Значение"
                    options={[
                        {value: 'equal', name: 'Равно'},
                        {value: 'contain', name: 'Содержит'},
                        {value: 'more', name: 'Больше'},
                        {value: 'less', name: 'Меньше'}
                    ]}
                />
            </div>
            <input
                className='table__input'
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder='Поиск...'
            />
        </div>);
};

export default TableFilters;