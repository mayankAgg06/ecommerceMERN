import Product from "../models/productModel.js";

export const newProductForm = (req,res)=>{
  res.render('products/new')
}

export const addProduct = async (req,res)=>{
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
        res.render('products/index',{allProducts})
    }
    catch{
        res.json({"message":"Error fetching the products"})
    }
}

export const editProductForm = async(req,res)=>{
    let {id} = req.params;
    let product = await Product.findById(id);
    res.render('products/edit' , {product});
}

export const deleteProduct = async(req,res)=>{
  let {id} = req.params;
  await Product.findByIdAndDelete(id);
  console.log("Deleted the product with ID - " , id);
  res.redirect('/products/allProducts')
}

export const showProduct = async(req,res)=>{
    let {id} = req.params;
    let product = await Product.findById(id).populate('reviews'); 
    console.log(product);
    console.log("POPULATED REVIEWS:", product.reviews);
    res.render('products/show' , {product});
}

export const updateChanges = async(req,res)=>{
  let {id} = req.params;
  const {name,dateCreated,warranty,price,isAvailable,image,desc}=req.body;
  await Product.findByIdAndUpdate(id, {name,dateCreated,warranty,price,isAvailable,image,desc});
  res.redirect(`/products/${id}`)
}