import express from 'express'
import { addProduct,getAllProducts,editProductForm, 
  deleteProduct,showProduct,updateChanges, newProductForm } from '../controllers/productController.js';

const router = express.Router();

router.get('/new',newProductForm)
router.post('/add',addProduct)
router.get('/allProducts',getAllProducts)
router.get('/:id' , showProduct)
router.get('/:id/edit' , editProductForm)
router.delete('/:id/delete', deleteProduct)
router.patch('/update/:id',updateChanges)

export default router;