import Product from "../models/productModel.js";

export const newProductForm = (req, res) => {
  res.render("products/new");
};

export const addProduct = async (req, res) => {
  try {
    const { name, dateCreated, warranty, price, isAvailable, image, desc } =
      req.body;

    const newProduct = new Product({
      name,
      dateCreated,
      warranty,
      price,
      isAvailable,
      image,
      desc,
    });

    await newProduct.save();
    req.flash("success", "Product added successfully");
    return res.redirect("/products/allProducts");
  } catch (e) {
    req.flash("error", "Data could not be added to the database");
    return res.redirect("/products/new");
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { availability } = req.query;

    const filter =
      availability === undefined ? {} : { isAvailable: availability };

    const allProducts = await Product.find(filter);

    return res.render("products/index", { allProducts });
  } catch (e) {
    req.flash("error", "Error fetching the products");
    return res.redirect("/products/allProducts");
  }
};

export const editProductForm = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product });
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  req.flash("success", "Product deleted successfully");
  res.redirect("/products/allProducts");
};

export const showProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate("reviews");
  res.render("products/show", { product });
};

export const updateChanges = async (req, res) => {
  const { id } = req.params;
  const { name, dateCreated, warranty, price, isAvailable, image, desc } =
    req.body;

  await Product.findByIdAndUpdate(id, {
    name,
    dateCreated,
    warranty,
    price,
    isAvailable,
    image,
    desc,
  });

  req.flash("success", "Product edited successfully");
  res.redirect(`/products/${id}`);
};
