const crypto = require("crypto");

const User = require("../models/User");
const ErrorHandler = require("../utilities/ErrorHandler");

const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utilities/jwtToken");
const sendEmail = require("../utilities/sendEmail");

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

// @desc        Reset Password when password forgot
// @route       GET /api/password/forgot
// @access      Public

const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ userEmail: req.body.userEmail });
  if (!user) {
    return next(
      new ErrorHandler(
        "User not found with email address: " + req.body.userEmail
      ),
      404
    );
  }

  // get reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // create reset password URL
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/password/reset/${resetToken}`;

  const message = `Your password reset token is: ${resetUrl}\n\n`;

  try {
    await sendEmail({
      email: user.userEmail,
      subject: "Shop IT Password Recovery",
      message,
    });
    res
      .status(200)
      .json({ success: true, message: `Email sent to ${user.userEmail}` });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// @desc        save reset password as new password
// @route       GET /api/password/reset:token
// @access      Public

const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Hash URL tokens
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is either invalid or has been expired",
        400
      )
    );
  }

  if (req.body.userPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  // set up new password
  user.userPassword = req.body.userPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

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
  forgotPassword,
  resetPassword,
  logoutUser,
};
