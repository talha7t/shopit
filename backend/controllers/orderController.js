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
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    // taxPrice,
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

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity, item.size, "create");
  });

  res.status(201).json({ success: true, order });
});

// @desc        Get single order
// @access      Private
// @route       GET /api/order/:id

const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  res.status(200).json({ success: true, order });
});

// @desc        Get logged in user orders
// @access      Private
// @route       GET /api/orders/me

const myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id }).sort({
    createdAt: -1,
    updatedAt: -1,
  });

  if (!orders) {
    return next(new ErrorHandler("No orders Found", 404));
  }

  res.status(200).json({ success: true, totalOrders: orders.length, orders });
});

// @desc        Admin get all orders
// @access      Private
// @route       GET /api/orders

const getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find().sort({ createdAt: -1, updatedAt: -1 });

  if (!orders) {
    return next(new ErrorHandler("No orders Found", 404));
  }

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res
    .status(200)
    .json({ success: true, totalOrders: orders.length, totalAmount, orders });
});

// @desc        Admin update order
// @access      Private
// @route       PUT /api/order/:id

const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No order Found", 404));
  }

  order.orderStatus = req.body.orderStatus;
  if (order.orderStatus === "delivered") {
    order.deliveredAt = Date.now();
  } else {
    order.deliveredAt = "";
  }
  await order.save();
  res.status(200).json({ success: true });
});

// @desc        Admin Delete an order
// @access      Private
// @route       Delete /api/order/:id

const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  if (order.orderStatus === "processing") {
    order.orderItems.forEach(async (item) => {
      await updateStock(
        item.product,
        item.quantity,
        item.productSize,
        "delete"
      );
    });
  }

  await order.remove();

  res.status(200).json({ success: true });
});

module.exports = {
  createOrder,
  getSingleOrder,
  getAllOrders,
  myOrders,
  updateOrder,
  deleteOrder,
};

async function updateStock(id, quantity, size, updateFor) {
  const product = await Product.findById(id);

  // create order on basis of stock avialability later
  product.inventory.forEach((item) => {
    // update stock based on selected size
    if (item.size === size && updateFor === "create") {
      item.productStock -= quantity;
    } else if (item.size === size && updateFor === "delete") {
      item.productStock += quantity;
    }
  });
  await product.save({ validateBeforeSave: false });
}
