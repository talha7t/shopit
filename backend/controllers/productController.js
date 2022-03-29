const asyncHandler = require("express-async-handler");

const Product = require("../models/Product");
const ErrorHandler = require("../utilities/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utilities/ApiFeautres");

// @desc        Get all products
// @route       GET /api/products?keyword=yourKeyword
// @access      Private
const getProducts = catchAsyncErrors(async (req, res, next) => {
  const resultsPerPage = 3;

  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);
  const products = await apiFeatures.query;

  if (!products) {
    return next(new ErrorHandler("Products not found", 404));
  }

  res
    .status(200)
    .json({ success: true, count: products.length, productCount, products });
});

// @desc        Get all products
// @route       GET /api/products
// @access      Private
const getProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({ success: true, product });
});

// @desc        Create a product
// @route       POST /api/products
// @access      Private
const createProduct = catchAsyncErrors(async (req, res, next) => {
  // req.body.user = req.user._id;
  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(200).json({ success: true, product });
});

// @desc        Update a product
// @route       PUT /api/products/:id
// @access      Private
const updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({ success: true, product });
});

// @desc        Delete a product
// @route       DELETE /api/products/:id
// @access      Private
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, message: `Deleted Product` });
});

// @desc        Create a Review
// @route       PUT /api/products/review/
// @access      Private

const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.userName,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);

  const isReviewed = product.productReviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.productReviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.productReviews.push(review);

    product.numOfReviews = product.productReviews.length;
  }
  let ratingSum = 0;

  product.productReviews.map((item) => {
    console.log(`rating: ${item.rating}`); // clg
    ratingSum += item.rating;
    return ratingSum;
  });

  console.log(ratingSum);

  product.ratings = ratingSum / product.productReviews.length;

  console.log(`Product rating: ${product.ratings}`);
  await product.save({ validateBeforeSave: false });
  res.status(201).json({ success: true });
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};
