import {$host} from "./index";

export const fetchProducts = async (page, limit, searchQuery, selectedFilter, selectedFilterValue, sortValue, selectedSort) => {
    return await $host.get(`api/products?page=${page}&limit=${limit}&selectedFilterValue=${selectedFilterValue}&selectedFilter=${selectedFilter}&searchQuery=${searchQuery}&selectedSort=${selectedSort}&sortValue=${sortValue}`)
}
