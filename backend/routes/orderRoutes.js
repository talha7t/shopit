const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post("/order/new", isAuthenticatedUser, orderController.createOrder);
router.get("/order/:id", isAuthenticatedUser, orderController.getSingleOrder);
router.get(
  "/admin/orders",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  orderController.getAllOrders
);
router.get("/orders/me", isAuthenticatedUser, orderController.myOrders);
router.put(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  orderController.updateOrder
);

router.delete(
  "/admin/order/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  orderController.deleteOrder
);
module.exports = router;
