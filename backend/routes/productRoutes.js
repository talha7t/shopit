const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.get("/", isAuthenticatedUser, productController.getProducts);
router.get("/:id", productController.getProduct);

router.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.createProduct
);

router.put(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.updateProduct
);

router.delete(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  productController.deleteProduct
);

module.exports = router;
