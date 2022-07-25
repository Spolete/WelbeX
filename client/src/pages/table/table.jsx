import React, {useEffect, useState} from 'react';
import TableHead from "../../components/TableHead/TableHead";
import TableBody from "../../components/TableBody/TableBody";
import TableFilters from "../../components/TableFilters/TableFilters";
import {fetchProducts} from "../../http/productAPI";
import TablePagination from "../../components/TablePagination/TablePagination";
import "./style.css"

const Table = () => {

        const [products, setProducts] = useState([])
        const [selectedSort, setSelectedSort] = useState(false)
        const [selectedFilter, setSelectedFilter] = useState('')
        const [selectedFilterValue, setSelectedFilterValue] = useState('')
        const [searchQuery, setSearchQuery] = useState('')
        const [sortValue, setSortValue] = useState('title')

        const [currentPage, setCurrentPage] = useState(1)
        const [pages, setPages] = useState([])

        const LIMIT = 20;

        const getProducts = async () => {
            return await fetchProducts(
                currentPage,
                LIMIT,
                searchQuery,
                selectedFilter,
                selectedFilterValue,
                sortValue,
                selectedSort,
            )
        }

        useEffect(() => {
            getProducts().then(response => {
                setProducts(response.data.results)
                setPages(response.data.pages)
                if (response.data.pages < currentPage) setCurrentPage(1)
            })
        }, [currentPage, searchQuery, selectedFilter, selectedFilterValue, sortValue, selectedSort])

        return (
            <>
                <TableFilters
                    selectedSort={selectedFilter}
                    setSelectedSort={setSelectedFilter}
                    selectedSortValue={selectedFilterValue}
                    setSelectedSortValue={setSelectedFilterValue}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                <table className='table'>
                    <TableHead
                        headers={[
                            {value: '', title: 'Дата'},
                            {value: 'title', title: 'Название'},
                            {value: 'amount', title: 'Количество'},
                            {value: 'distance', title: 'Расстояние'},
                        ]}
                        selectedSort={selectedSort}
                        setSelectedSort={setSelectedSort}
                        sortValue={sortValue}
                        setSortValue={setSortValue}
                    />
                    <TableBody products={products}/>
                </table>
                {pages !== 0 && <TablePagination
                    totalPages={pages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />}
                {products.length === 0 && <div className='table__noneResults'>Результы не найдены</div>}
            </>
        );
    }
;

export default Table;