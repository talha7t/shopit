const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.put(
  "/products/review",
  isAuthenticatedUser,
  productController.createProductReview
);

router.get("/products/reviews", productController.getProductReviews);
router.delete(
  "/products/review",
  isAuthenticatedUser,
  productController.deleteReview
);

router.get(
  "/admin/products/",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.adminGetProducts
);
router.get("/products/", productController.getProducts);
router.get("/products/:id", productController.getProduct);

router.post(
  "/admin/product/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.createProduct
);

router.put(
  "/admin/products/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.updateProduct
);

router.delete(
  "/admin/products/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.deleteProduct
);

module.exports = router;
