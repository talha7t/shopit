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

  // if (!user) {
  //   return next(
  //     new ErrorHandler("Something went wrong. Please try again", 401)
  //   );
  // }

  sendToken(user, 200, res);
});

// @desc        Login a user
// @route       POST /api/login
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
// @route       POST /api/password/forgot
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
  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  // const resetUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/password/reset/${resetToken}`;

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
// @route       PUT /api/password/reset:token
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

// @desc        Customer view account details
// @route       GET /api/logout
// @access      Public

const getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({ success: true, user });
});

// @desc        Customer Update account details
// @route       PUT /api/me/update
// @access      Public

const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userAddress: req.body.userAddress,
    userContact: req.body.userContact,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({ success: true });
});

// @desc        Customer Update Password
// @route       PUT /api/password/update
// @access      Public

const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+userPassword");

  // check if old password is correct
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler("Old Password is incorrect", 400));
  }

  user.userPassword = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

// @desc        Admin get all users
// @route       GET /api/users
// @access      Private

const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find().sort({createdAt: -1, updatedAt: -1});

  if (!users) {
    return next(new ErrorHandler("No users Found"), 400);
  }

  res.status(200).json({ success: true, usersCount: users.length, users });
});

// @desc        Admin get specific users
// @access      Private
// @route       GET /api/users/:id

const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not Found"), 404);
  }

  res.status(200).json({ success: true, user });
});

// @desc        Admin update user profile
// @route       PUT /api/user/:id
// @access      Private

const adminUpdateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userRole: req.body.userRole,
    userStatus: req.body.userStatus,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({ success: true });
});

// @desc        Admin delete a specific suer
// @access      Private
// @route       DELETE /api/user/:id

const adminDeleteProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not Found"), 404);
  }

  await user.remove();

  res.status(200).json({ success: true });
});

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  logoutUser,
  getUserProfile,
  updateProfile,
  updatePassword,
  getAllUsers,
  getUser,
  adminUpdateProfile,
  adminDeleteProfile,
};
