// const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const ErrorHandler = require("../utilities/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utilities/ApiFeautres");
const cloudinary = require("cloudinary");

// @desc        User Get all products
// @route       GET /api/products?keyword=yourKeyword
// @access      Public
const getProducts = catchAsyncErrors(async (req, res, next) => {
  const resultsPerPage = 10;

  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);
  const products = await apiFeatures.query;

  if (!products) {
    return next(new ErrorHandler("Products not found", 404));
  }

  res.status(200).json({
    success: true,
    productCount,
    products,
    resultsPerPage,
  });
});

// @desc        Get single products
// @route       GET /api/product/:id
// @access      Private
const getProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  console.log(req.clientIp);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({ success: true, product });
});

// @desc        Admin Get all products
// @route       GET /api/admin/products
// @access      Public
const adminGetProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find().sort({ createdAt: -1, updatedAt: -1 });

  if (!products) {
    return next(new ErrorHandler("Products not found", 404));
  }

  res.status(200).json({
    success: true,
    products,
  });
});

// @desc        Create a product
// @route       POST /api/products
// @access      Private
const createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];
  req.body.inventory = JSON.parse(req.body.inventory);

  if (typeof req.body.productImages === "string") {
    // if only one image is uploaded then just push the image into array
    images.push(req.body.productImages);
  } else {
    // else replace the array with array of images
    images = req.body.productImages;
  }

  let imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.productImages = imagesLinks;
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

  //  handle imaegs and inventory
  let images = [];
  req.body.inventory = JSON.parse(req.body.inventory);

  if (typeof req.body.productImages === "string") {
    // if only one image is uploaded then just push the image into array
    images.push(req.body.productImages);
  } else {
    // else replace the array with array of images
    images = req.body.productImages;
  }

  if (images !== undefined) {
    // deleting old images associated with the product
    for (let i = 0; i < product.productImages.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        product.productImages[i].public_id
      );
    }

    // setting new images for product
    let imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.productImages = imagesLinks;
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

  // deleting images associated with the product
  for (let i = 0; i < product.productImages.length; i++) {
    const result = await cloudinary.v2.uploader.destroy(
      product.productImages[i].public_id
    );
  }

  // await Product.findByIdAndDelete(req.params.id);
  await product.remove();

  res.status(200).json({ success: true, message: `Deleted Product` });
});

// @desc        Create a Review
// @route       PUT /api/products/review?id=productId
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
    ratingSum += item.rating;
    return ratingSum;
  });

  product.ratings = ratingSum / product.productReviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(201).json({ success: true });
});

// @desc        get all reviews
// @route       GET /api/products/reviews/
// @access      Private

const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({ success: true, reviews: product.productReviews });
});

// @desc        delete a product review
// @route       DELETE /api/products/review/
// @access      Private

const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  const productReviews = product.productReviews.filter((review) => {
    return review._id.toString() !== req.query.id.toString();
  });

  if (!productReviews) {
    return next(new ErrorHandler("No such review found.", 404));
  }
  const numOfReviews = productReviews.length;
  let ratingSum = 0;

  productReviews.map((item) => {
    ratingSum += item.rating;
    return ratingSum;
  });

  const ratings =
    productReviews.length > 0 ? ratingSum / productReviews.length : 0;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      productReviews,
      numOfReviews,
      ratings,
    },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).json({ success: true, reviews: product.productReviews });
});

module.exports = {
  getProducts,
  getProduct,
  adminGetProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
};
