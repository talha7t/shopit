const express = require("express");
const dotenv = require("dotenv").config(); // allows us to have dot env file with our variables
const errorHandler = require("./middlewares/errors");
const productRoutes = require("./routes/productRoutes");
const connectDB = require("./utilities/db");

const PORT = process.env.port || 3000;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", productRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
