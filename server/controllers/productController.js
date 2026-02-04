import Product from "../models/productModel.js";

export const addProductController = async (req,res)=>{
  try{
    const {name,dateCreated,warranty,price,isAvailable,image,desc}=req.body;
    const newProduct = new Product({
      name,dateCreated,warranty,price,isAvailable,image,desc
    })
    await newProduct.save();
    res.send('New product has been added');
    res.redirect('/products/allProducts');
  }
  catch{
    res.send('Data Couldnot be added to the database');
  }
}

export const getAllProducts = async (req,res)=>{
    try{
        const {availability} = req.query;
        const allProducts = await Product.find({isAvailable:availability});
        if(!allProducts)
        {
            res.json({"message": "No products available"})
        }
        res.render('/products/index',{allProducts})
    }
    catch{
        res.json({"message":"Error fetching the products"})
    }
}
