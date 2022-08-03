const ErrorHandler = require("../utilities/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../models/User");

// Checks if the user is authenticated and
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(
      new ErrorHandler("You must be logged in to use this feature", 401)
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id); // store id of currently logged in user in req.user
  next();
});

// Handle user roles

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.userRole)) {
      return next(
        new ErrorHandler(
          `User with Role ${req.user.userRole} is not allowed to use this feature`,
          403
        )
      );
    }

    next();
  };
};
