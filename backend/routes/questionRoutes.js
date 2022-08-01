const express = require("express");
const router = express.Router();

const faqController = require("../controllers/faqController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.get("/questions", faqController.getQuestions);

router.get(
  "/admin/questions",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  faqController.adminGetQuestions
);

router.get(
  "/admin/question/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  faqController.AdminGetQuestion
);

router.post(
  "/admin/question/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  faqController.createQuestion
);

router.put(
  "/admin/question/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  faqController.updateQuestion
);

router.delete(
  "/admin/question/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  faqController.deleteQuestion
);

module.exports = router;
