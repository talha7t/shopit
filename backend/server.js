const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");
const errorHandler = require("./middlewares/errors");
// const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const questionRoutes = require("./routes/questionRoutes");
const storeRoutes = require("./routes/storeRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const connectDB = require("./utilities/db");

var requestIp = require("request-ip");

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down due to uncaught exception");

  process.exit(1);
});

dotenv.config(); // allows us to have dot env file with our variables
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

// ip address to get middleware
// app.use(requestIp.mw())

app.use("/api", productRoutes);
app.use("/api", authRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentRoutes);
app.use("/api", storeRoutes);
app.use("/api", questionRoutes);

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
