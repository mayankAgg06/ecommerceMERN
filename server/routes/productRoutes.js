import express from 'express'
import Product from '../models/productModel.js';

const router = express.Router();

router.post('/add',async (req,res)=>{
  try{
    const {name,dateCreated,warranty,price,isAvailable}=req.body;
    const newProduct = new Product({
      name,dateCreated,warranty,price,isAvailable
    })
    await newProduct.save();
    res.send('New product has been added');
  }
  catch{
    res.send('Data Couldnot be added to the database');
  }
})

router.get('/allProducts',async (req,res)=>{
    try{
        const {availability} = req.query;
        const allProducts = await Product.find({isAvailable:availability});
        if(!allProducts)
        {
            res.json({"message": "No products available"})
        }
        res.json({"message": "Products found", allProducts})
    }
    catch{
        res.json({"message":"Error fetching the products"})
    }
})

export default router;