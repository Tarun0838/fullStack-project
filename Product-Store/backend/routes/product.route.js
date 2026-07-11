import { Router } from "express";

import mongoose from "mongoose";
import { createProducts, deleteProducts, getProducts, updateProducts } from "../controller/product.controller.js";

const router = Router();

// getting all product routes
router.get('/', getProducts )

// creating product routes 
router.post('/', createProducts )


// deleting product routes
router.delete('/:id', deleteProducts )


// update product routes
router.patch('/:id', updateProducts)


export default router;