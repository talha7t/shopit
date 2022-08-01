const { Router } = require("express");
const express = require("express");
const router = express.Router();

const storeController = require("../controllers/storeController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.get("/stores", storeController.getStores);

router.get(
  "/admin/stores",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  storeController.adminGetStores
);

router.get(
  "/admin/store/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  storeController.getStore
);

router.post(
  "/admin/store/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  storeController.createStore
);

router.put(
  "/admin/store/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  storeController.updateStore
);

router.delete(
  "/admin/store/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  storeController.deleteStore
);

module.exports = router;
