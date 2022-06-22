const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/confirmation/:email/:token", authController.confirmEmail);

router.post("/password/forgot", authController.forgotPassword);
router.put("/password/reset/:token", authController.resetPassword);
router.get("/logout", authController.logoutUser);
router.get("/me", isAuthenticatedUser, authController.getUserProfile);
router.put("/me/update", isAuthenticatedUser, authController.updateProfile);
router.put(
  "/password/update",
  isAuthenticatedUser,
  authController.updatePassword
);
router.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  authController.getAllUsers
);

router.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  authController.getUser
);
router.put(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  authController.adminUpdateProfile
);
router.delete(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  authController.adminDeleteProfile
);

module.exports = router;
