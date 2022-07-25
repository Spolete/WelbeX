import {Router} from "express";
import tableController from "../controller/table.controller.js";
import {filterTable, paginatedResults} from '../midlleware/table.middleware.js'

const router = new Router();

router.get('/products', filterTable, paginatedResults, tableController.getProducts)


export default router
