const Product = require("../models/Product");
const dotenv = require("dotenv");
const connectDB = require("./db");
const asyncHandler = require("express-async-handler");

const products = require("../data/products");

dotenv.config({ path: ".env" });

connectDB();

const seedProducts = asyncHandler(async (req, res) => {
  await Product.deleteMany();
  console.log("Products deleted");

  await Product.insertMany(products);
  console.log("Products added");

  process.exit();
});

seedProducts();
