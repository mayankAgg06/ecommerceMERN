import express from 'express'
import { addProductController,
  getAllProducts } from '../controllers/productController.js';

const router = express.Router();

router.post('/add',addProductController)

router.get('/allProducts',getAllProducts)

export default router;