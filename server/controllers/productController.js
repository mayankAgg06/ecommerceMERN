import Product from "../models/productModel.js";

export const addProductController = async (req,res)=>{
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
}

export const getAllProducts = async (req,res)=>{
    try{
        const {availability} = req.query;
        const allProducts = await Product.find({isAvailable:availability});
        if(!allProducts)
        {
            res.json({"message": "No products available"})
        }
        res.render('products',{allProducts})
        
    }
    catch{
        res.json({"message":"Error fetching the products"})
    }
}
