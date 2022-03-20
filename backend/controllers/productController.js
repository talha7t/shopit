const asyncHandler = require("express-async-handler");

const Product = require("../models/Product");

// @desc        Get all products
// @route       GET /api/products
// @access      Private
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.status(200).json(products);
});

// @desc        Get all products
// @route       GET /api/products
// @access      Private
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error();
  }

  res.status(200).json({ product });
});

// @desc        Create a product
// @route       POST /api/products
// @access      Private
const createProduct = asyncHandler(async (req, res) => {
  const { productName } = req.body;

  if (!productName) {
    res.status(400);
    throw new Error("Please provide text");
  }

  const product = await Product.create(req.body);

  res.status(200).json({ product });
});

// @desc        Update a product
// @route       PUT /api/products/:id
// @access      Private
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("Product not Found");
  }
  const updateProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({ updateProduct });
});

// @desc        Delete a product
// @route       DELETE /api/products/:id
// @access      Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product not Found");
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: `Deleted Product ${req.params.id}` });
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
