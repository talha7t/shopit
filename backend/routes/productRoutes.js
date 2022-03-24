const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middlewares/auth");

router.get("/", productController.getProducts);

router.get("/:id", productController.getProduct);

router.post("/", isAuthenticatedUser, productController.createProduct);

router.put("/:id", isAuthenticatedUser, productController.updateProduct);

router.delete("/:id", isAuthenticatedUser, productController.deleteProduct);

module.exports = router;
