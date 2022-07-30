const mongoose = require("mongoose");

const storeSchema = mongoose.Schema({
  storeId: {
    type: String,
    unique: true,
    required: [true, "Please provide a unique id for your store"],
    maxLength: [10, "Store id can not exceed 10 characters"],
  },
  storeName: {
    type: String,
    required: [true, "Please provide a name for your store"],
    maxLength: [50, "Store name can not exceed 50 characters"],
  },
  storeAddress: {
    type: String,
    required: [true, "Please provide a name for your store"],
    maxLength: [80, "Store address can not exceed 80 characters"],
  },
  storeURL: {
    type: String,
    unique: true,
    required: [
      true,
      "Please provide a google maps embedding URL for your store",
    ],
    maxLength: [350, "Store address can not exceed 350 characters"],
  },
});

module.exports = mongoose.model("Store", storeSchema);
