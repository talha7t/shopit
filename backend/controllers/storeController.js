const Store = require("../models/Store");
const ErrorHandler = require("../utilities/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// @desc        Get single store
// @route       GET /api/admin/store/:id
// @access      Private
const getStore = catchAsyncErrors(async (req, res, next) => {
  const store = await Store.findById(req.params.id);

  if (!store) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({ success: true, store });
});

// @desc        Admin get all stores
// @route       GET /api/admin/stores
// @access      Private
const adminGetStores = catchAsyncErrors(async (req, res, next) => {
  const stores = await Store.find().sort({ createdAt: -1, updatedAt: -1 });

  if (!stores) {
    return next(new ErrorHandler("Stores not found", 404));
  }

  res.status(200).json({
    success: true,
    stores,
  });
});

// @desc        Admin Create a Store
// @route       POST /api/admin/store/new
// @access      Private

const createStore = catchAsyncErrors(async (req, res, next) => {
  const storeData = ({ storeId, storeName, storeAddress, storeURL } = req.body);

  const store = await Store.create(storeData);

  res.status(201).json({ success: true, store });
});

// @desc        Admin update a store
// @route       PUT /api/admin/store/:id
// @access      Private

const updateStore = catchAsyncErrors(async (req, res, next) => {
  let store = await Store.findById(req.params.id);
  const storeData = ({ storeId, storeName, storeAddress, storeURL } = req.body);

  if (!store) {
    return next(new ErrorHandler("Store not found", 404));
  }

  store = await Store.findByIdAndUpdate(req.params.id, storeData, {
    new: true,
  });

  res.status(200).json({ success: true, store });
});

// @desc        Admin Delete a store
// @route       DELETE /api/store/:id
// @access      Private
const deleteStore = catchAsyncErrors(async (req, res, next) => {
  const store = await Store.findById(req.params.id);

  if (!store) {
    return next(new ErrorHandler("Store not found", 404));
  }

  await store.remove();
  res.status(200).json({ success: true, message: `Deleted Store` });
});

module.exports = {
  getStore,
  adminGetStores,
  createStore,
  updateStore,
  deleteStore,
};
