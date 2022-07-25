import {Router} from "express";
import tableController from "../controller/table.controller.js";
import {filterTable, paginatedResults, sortResults} from '../midlleware/table.middleware.js'

const router = new Router();

router.get('/products', filterTable, sortResults, paginatedResults, tableController.getProducts)


export default router
