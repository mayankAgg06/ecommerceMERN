import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from './models/productModel.js'
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.mongodb_uri)
.then(()=>{
  console.log("Database Connected Successfully")
  app.listen( 5500, () => {
    console.log('Server is running on port 5500');
  })
})
.catch((err)=>{
  console.log('Error connecting to database ',err)
})


app.get('/', (req, res) => {
  res.send('Ecommerce Server is running');
});

app.post('/add',async (req,res)=>{
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


// {
//     "name":"mobile",
//     "dateCreated":2025,
//     "warranty":2,
//     "price": 45000,
//     "isAvailable": true
// }
