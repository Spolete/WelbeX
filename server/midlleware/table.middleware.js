import db from "../db.js";

export async function filterTable(req, res, next) {
    const selectedFilter = req.query.selectedFilter;
    const selectedFilterValue = req.query.selectedFilterValue;
    const searchQuery = req.query.searchQuery;

    const model = await db.query(`SELECT * FROM product`);

    if (selectedFilter && selectedFilterValue) {
        if (selectedFilterValue === 'equal') {
            if (selectedFilter === 'title') {
                res.results = model.rows.filter(product => product[selectedFilter] === searchQuery)
                next();
            } else {
                res.results = model.rows.filter(product => product[selectedFilter].toString() === searchQuery)
                next();
            }
        }
        if (selectedFilterValue === 'contain') {
            if (selectedFilter === 'title') {
                res.results = model.rows.filter(product => product[selectedFilter].includes(searchQuery))
                next();
            } else {
                res.results = model.rows.filter(product => product[selectedFilter].toString().includes(searchQuery))
                next();
            }
        }
        if (selectedFilterValue === 'more') {
            res.results = model.rows.filter(product => product[selectedFilter] > Number(searchQuery))
            next();
        }
        if (selectedFilterValue === 'less') {
            res.results = model.rows.filter(product => product[selectedFilter] < Number(searchQuery))
            next();
        }
    } else {
        res.results = model.rows;
        next();
    }
}

export async function paginatedResults(req, res, next) {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const results = {};

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    results.totalCount = res.results.length;
    results.pages = Math.ceil(res.results.length / limit);
    results.results = res.results.slice(startIndex, endIndex);

    res.results = results;
    next();
}

export async function sortResults(req, res, next) {
    const sortValue = req.query.sortValue;
    const selectedSort = req.query.selectedSort;

    const sortAscByField = (field) => {
        return (a, b) => a[field] < b[field] ? 1 : -1;
    }

    const sortDesByField = (field) => {
        return (a, b) => a[field] > b[field] ? 1 : -1;
    }

    if (selectedSort === 'true') {
        res.results = res.results.sort(sortAscByField(sortValue))
        next()
    }
    else if (selectedSort === 'false') {
        res.results = res.results.sort(sortDesByField(sortValue))
        next()
    }
}