const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.put(
  "/products/review",
  isAuthenticatedUser,
  productController.createProductReview
);

router.get("/products/", productController.getProducts);
router.get("/products/:id", productController.getProduct);

router.post(
  "/products/",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.createProduct
);

router.put(
  "/products/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.updateProduct
);

router.delete(
  "/products/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.deleteProduct
);

module.exports = router;
