import express from 'express'
import { addProductController,
  getAllProducts } from '../controllers/productController.js';

const router = express.Router();

router.get('/new',()=>{
  res.render('/products/new')
})
router.post('/add',addProductController)

router.get('/allProducts',getAllProducts)

// router.get('/:id' , async(req,res)=>{
//     let {id} = req.params;
//     let foundProduct = await Product.findById(id);
//     res.render('products/show' , {foundProduct});
// })

export default router;