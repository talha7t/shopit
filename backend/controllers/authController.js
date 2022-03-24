const User = require("../models/User");

const ErrorHandler = require("../utilities/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utilities/jwtToken");

// @desc        Register a user
// @route       GET /api/register
// @access      Public

const registerUser = catchAsyncErrors(async (req, res, next) => {
  const {
    userName,
    userEmail,
    userPassword,
    userStatus,
    userRole,
    userAddress,
    userContact,
  } = req.body;

  const user = await User.create({
    userName,
    userEmail,
    userPassword,
    userStatus,
    userRole,
    userAddress,
    userContact,
  });

  sendToken(user, 200, res);
});

// @desc        Login a user
// @route       GET /api/login
// @access      Public

const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { userEmail, userPassword } = req.body;

  // check if email and password are entered by the user
  if (!userEmail || !userPassword) {
    return next(new ErrorHandler("Please enter email and password"), 400);
  }

  // Find user in database
  const user = await User.findOne({ userEmail }).select("+userPassword");

  // check if user exists
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  // check if password is correct or not
  const isPasswordMatched = await user.comparePassword(userPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  sendToken(user, 200, res);
});

// @desc        Logout a user
// @route       GET /api/logout
// @access      Public

const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });

  res.status(200).json({ success: true, message: "User logged out" });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
