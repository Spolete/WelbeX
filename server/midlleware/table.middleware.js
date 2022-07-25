import db from "../db.js";

export async function filterTable(req, res, next) {
    const selectedFilter = req.query.selectedFilter;
    const selectedFilterValue = req.query.selectedFilterValue;
    const searchQuery = req.query.searchQuery;

    const model = await db.query(`SELECT * FROM product`);

    if (selectedFilter && selectedFilterValue) {
        if (selectedFilterValue === 'equal') {
            if (selectedFilter === 'title') {
                res.rows = model.rows.filter(product => product[selectedFilter] === searchQuery)
                next();
            } else {
                res.rows = model.rows.filter(product => product[selectedFilter].toString() === searchQuery)
                next();
            }
        }
        if (selectedFilterValue === 'contain') {
            if (selectedFilter === 'title') {
                res.rows = model.rows.filter(product => product[selectedFilter].includes(searchQuery))
                next();
            } else {
                res.rows = model.rows.filter(product => product[selectedFilter].toString().includes(searchQuery))
                next();
            }
        }
        if (selectedFilterValue === 'more') {
            res.rows = model.rows.filter(product => product[selectedFilter] > Number(searchQuery))
            next();
        }
        if (selectedFilterValue === 'less') {
            res.rows = model.rows.filter(product => product[selectedFilter] < Number(searchQuery))
            next();
        }
    } else {
        res.rows = model.rows;
        next();
    }
}
export async function paginatedResults(req, res, next) {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const results = {};

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    results.totalCount = res.rows.length;
    results.pages = Math.ceil(res.rows.length / limit);
    results.results = res.rows.slice(startIndex, endIndex);

    res.paginatedResults = results;
    next();
}