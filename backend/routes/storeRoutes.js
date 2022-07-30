const { Router } = require("express");
const express = require("express");
const router = express.Router();

const storeController = require("../controllers/storeController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.get(
  "/admin/store/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  storeController.getStore
);

router.get(
  "/admin/stores",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  storeController.adminGetStores
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

module.exports = router;
