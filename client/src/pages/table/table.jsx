import React, {useEffect, useState} from 'react';
import TableHead from "../../components/TableHead/TableHead";
import TableBody from "../../components/TableBody/TableBody";
import TableFilters from "../../components/TableFilters/TableFilters";
import {fetchProducts} from "../../http/productAPI";
import TablePagination from "../../components/TablePagination/TablePagination";
import "./style.css"

const Table = () => {

        const [products, setProducts] = useState([])
        const [selectedSort, setSelectedSort] = useState(1)
        const [selectedFilter, setSelectedFilter] = useState('')
        const [selectedFilterValue, setSelectedFilterValue] = useState('')
        const [searchQuery, setSearchQuery] = useState('')

        const [currentPage, setCurrentPage] = useState(1)
        const [pages, setPages] = useState([])

        const LIMIT = 20;
        const sortAscByField = (field) => {
            return (a, b) => a[field] < b[field] ? 1 : -1;
        }

        const sortDesByField = (field) => {
            return (a, b) => a[field] > b[field] ? 1 : -1;
        }


        const sortProducts = (sortValue) => {
            if (sortValue !== '') {
                if (selectedSort === 1) {
                    setProducts([...products].sort(sortAscByField(sortValue)))
                    setSelectedSort(0)
                } else if (selectedSort === 0) {
                    setProducts([...products].sort(sortDesByField(sortValue)))
                    setSelectedSort(1)
                }
            }
        }

        const getProducts = async () => {
            return await fetchProducts(currentPage, LIMIT, searchQuery, selectedFilter, selectedFilterValue)
        }

        useEffect(() => {
            getProducts().then(response => {
                setProducts(response.data.results)
                setPages(response.data.pages)
                if (response.data.pages < currentPage) setCurrentPage(1)
            })
        }, [currentPage, searchQuery, selectedFilter, selectedFilterValue])

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
                        sortProducts={sortProducts}
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