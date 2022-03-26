const Order = require("../models/Order");
const Product = require("../models/Product");
const ErrorHandler = require("../utilities/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// @desc        Create new order
// @access      Private
// @route       Post /api/order/new

const createOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  if (!order) {
    return next(
      new ErrorHandler("Could not proceed your order, Please try again", 400)
    );
  }

  res.status(201).json({ success: true, order });
});

module.exports = {
  createOrder,
};
