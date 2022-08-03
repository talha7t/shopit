const express = require("express");
// const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");
const errorHandler = require("./middlewares/errors");
// const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const storeRoutes = require("./routes/storeRoutes");
const path = require("path");
const paymentRoutes = require("./routes/paymentRoutes");
const connectDB = require("./utilities/db");

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down due to uncaught exception");

  process.exit(1);
});

// setting up config file
if (process.env.NODE_ENV !== "PRODUCTION")
  require("dotenv").config({ path: ".env" }); // allows us to have dot env file with our variables

const PORT = process.env.port || 3000;
connectDB();
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.COUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api", productRoutes);
app.use("/api", authRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentRoutes);
app.use("/api", storeRoutes);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

app.use(errorHandler);

const server = app.listen(PORT, () =>
  console.log(`server started on port ${PORT}`)
);

// Handlig unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to an unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
