// const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const User = require("../models/User");
const ErrorHandler = require("../utilities/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utilities/ApiFeautres");
const cloudinary = require("cloudinary");
const sendEmail = require("../utilities/sendEmail");

// @desc        User Get all products
// @route       GET /api/products?keyword=yourKeyword
// @access      Public
const getProducts = catchAsyncErrors(async (req, res, next) => {
  const resultsPerPage = 10;

  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  // let products = await apiFeatures.query;
  let products = await apiFeatures;
  let filteredProductsCount = products.length;

  apiFeatures.pagination(resultsPerPage);

  products = await apiFeatures.query;

  if (!products) {
    return next(new ErrorHandler("Products not found", 404));
  }

  res.status(200).json({
    success: true,
    productCount,
    products,
    filteredProductsCount,
    resultsPerPage,
  });
});

// @desc        Get single products
// @route       GET /api/product/:id
// @access      Private
const getProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

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
  const user = await User.findById(req.user._id);

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
    // push review to product and user
    product.productReviews.push(review);
    user.userReviews.push({ comment });

    product.numOfReviews = product.productReviews.length;
  }

  // calculating ratings
  let ratingSum = 0;

  product.productReviews.map((item) => {
    ratingSum += item.rating;
    return ratingSum;
  });

  product.ratings = ratingSum / product.productReviews.length;

  // getting reviews within 1 day
  reviewObserver(1, user, 90, 5);

  // saving changes to product and user
  await product.save({ validateBeforeSave: false });
  await user.save({ validateBeforeSave: false });

  res.status(201).json({ success: true });
});

// function to find similar comments
function reviewObserver(days, user, percentageLimit, minReviews) {
  const reviews = user.userReviews.filter(
    (item) => new Date(item.reviewdAt) > Date.now() - days * 24 * 60 * 60 * 1000
  );

  if (reviews.length >= minReviews) {
    const counts = {};

    reviews.forEach((review) => {
      counts[review.comment] = (counts[review.comment] || 0) + 1;
    });

    const percentages = [];
    for (const key in counts) {
      percentages.push((counts[key] / reviews.length) * 100);
    }

    percentages.forEach((percentage) => {
      if (percentage >= percentageLimit && user.status === "unblocked") {
        user.userStatus = "warned";
        sendStatusMail("warned");
        return;
      }
      if (percentage >= percentageLimit && user.status === "warned") {
        user.userStatus = "blocked";
        sendStatusMail("blocked");
        return;
      }
    });
  }
}

async function sendStatusMail(status) {
  const message =
    "Hello " + user.userName + ",\n\n" + status === "warned"
      ? "We have observed unsusual activity from your account. If we observe any further unsual activity we will block your account. Unsual activity might be using bots to review products or repeating the same review"
      : "Your account has been bleckoed due to unsual activity";

  try {
    await sendEmail({
      email: user.userEmail,
      subject: `Account ${status} notification from Shop IT`,
      message,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}

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
