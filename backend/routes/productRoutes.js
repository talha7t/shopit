const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middlewares/auth");

router.get("/", isAuthenticatedUser, productController.getProducts);

router.get("/:id", productController.getProduct);

router.post("/", productController.createProduct);

router.put("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
