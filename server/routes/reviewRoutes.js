import express from 'express'
import Product from '../models/productModel.js';
import Review from '../models/reviewsModel.js';

const router = express.Router();

router.post('/products/:id/review', async (req, res) => {

    console.log("BODY:", req.body); 
  const { id } = req.params;
  const { rating, comment } = req.body;

  const review = await Review.create({ rating, comment });

  await Product.findByIdAndUpdate(
    id,
    { $push: { reviews: review._id } },
    { runValidators: false } // not required, bs asaan karne ke liye hai
  );

  console.log("SAVED REVIEW:", review);


  res.redirect(`/products/${id}`);
});


export default router;