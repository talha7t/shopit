const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errors");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const connectDB = require("./utilities/db");

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

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", productRoutes);
app.use("/api", authRoutes);
app.use("/api", orderRoutes);

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
