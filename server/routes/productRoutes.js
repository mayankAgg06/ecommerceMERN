import express from "express";
import {
  addProduct,
  getAllProducts,
  editProductForm,
  deleteProduct,
  showProduct,
  updateChanges,
  newProductForm,
} from "../controllers/productController.js";

import { isLoggedIn } from "../middleware.js";

const router = express.Router();

router.get("/new", isLoggedIn, newProductForm);
router.post("/add", isLoggedIn, addProduct);

router.get("/allProducts", getAllProducts);
router.get("/:id", showProduct);

router.get("/:id/edit", isLoggedIn, editProductForm);
router.patch("/update/:id", isLoggedIn, updateChanges);
router.delete("/:id/delete", isLoggedIn, deleteProduct);

export default router;
