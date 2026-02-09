import express from 'express'
import { addProductController,
  getAllProducts } from '../controllers/productController.js';
import Product from '../models/productModel.js';
import path from 'path';

const router = express.Router();

router.get('/new',(req,res)=>{
  res.render('products/new')
})
router.post('/add',addProductController)

router.get('/allProducts',getAllProducts)

router.get('/:id' , async(req,res)=>{
    let {id} = req.params;
    let product = await Product.findById(id);
    res.render('products/show' , {product});
})

router.get('/:id/edit' , async(req,res)=>{
    let {id} = req.params;
    let product = await Product.findById(id);
    res.render('products/edit' , {product});
})

router.patch('/update/:id',async(req,res)=>{
  let {id} = req.params;
  const {name,dateCreated,warranty,price,isAvailable,image,desc}=req.body;
  await Product.findByIdAndUpdate(id, {name,dateCreated,warranty,price,isAvailable,image,desc});
  res.redirect(`/products/${id}`)
})
export default router;