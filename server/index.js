import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const app = express();

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



