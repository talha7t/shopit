const User = require("../models/User");
const Token = require("../models/Token");
const ErrorHandler = require("../utilities/ErrorHandler");

const crypto = require("crypto");
// const nodemailer = require("nodemailer");

const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utilities/jwtToken");
const sendEmail = require("../utilities/sendEmail");

// @desc        Register a user
// @route       GET /api/register
// @access      Public

const registerUser = catchAsyncErrors(async (req, res, next) => {
  const existingUser = await User.findOne({ userEmail: req.body.userEmail });

  // if email is exist into database i.e. email is associated with another user.
  if (existingUser) {
    return next(
      new ErrorHandler(
        "This email is already associated wih another account",
        400
      )
    );
  }

  // if user is not exist into database then save the user into database for register account
  const userData = ({
    userName,
    userEmail,
    userDateOfBirth,
    userPassword,
    userAddress,
    userCity,
    userZipCode,
    userCountry,
    userContact,
    userStatus,
    userRole,
  } = req.body);

  const user = await User.create(userData);
  if (!user) {
    return next(
      new ErrorHandler("Something went wrong. Please try again", 401)
    );
  }

  // generate token and save
  const token = await new Token({
    _userId: user._id,
    token: crypto.randomBytes(16).toString("hex"),
  });
  token.save();

  // ---------------Send email---------- //
  //for local host
  // const confirmationURL = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  // for production
  // const confirmationURL = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/password/reset/${resetToken}`;

  const message =
    "Hello " +
    user.userName +
    ",\n\n" +
    "Please verify your account by clicking the link: \n" +
    // req.headers.host +
    process.env.FRONTEND_URL +
    "/confirmation/" +
    user.userEmail +
    "/" +
    token.token +
    "\n\nThank You!\n";

  try {
    await sendEmail({
      email: user.userEmail,
      subject: "Account verification email for Shop IT",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Confirmation email sent to ${user.userEmail}. Please check your email.`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }

  // sendToken(user, 200, res);
});

// @desc        verfiy user email
// @route       GET /api/confirmation/:email/:token
// @access      Private

const confirmEmail = catchAsyncErrors(async (req, res, next) => {
  const token = await Token.findOne({ token: req.params.token });
  // token is not found into database i.e. token may have expired
  if (!token) {
    return next(
      new ErrorHandler(
        "Your verification link may have expired. Please click on resend for verify your Email."
      ),
      400
    );
    // return res.status(400).send({
    //   msg: "Your verification link may have expired. Please click on resend for verify your Email.",
    // });
  }

  const user = await User.findOne({
    _id: token._userId,
    email: req.params.email,
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "We were unable to find a user for this verification. Please SignUp!"
      ),
      401
    );
    // return res.status(401).send({
    //   msg: "We were unable to find a user for this verification. Please SignUp!",
    // });
  }
  // user is already verified
  else if (user.isVerified) {
    return res
      .status(200)
      .json({ message: "User has been already verified. Please Login" });
  }
  // verify user
  else {
    // change isVerified to true
    user.isVerified = true;
    user.save();

    // res.redirect("/login");
    res.status(200).json({ message: "You account has been verified" });
  }
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

  // check user is verified or not
  if (!user.isVerified) {
    return next(
      new ErrorHandler(
        `Your Email has not been verified. Please click on resend`,
        401
      )
    );
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
  const userData = ({
    userName,
    userDateOfBirth,
    userAddress,
    userCity,
    userZipCode,
    userCountry,
    userContact,
    userStatus,
    userRole,
  } = req.body);

  const user = await User.findByIdAndUpdate(req.user.id, userData, {
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
  const users = await User.find().sort({ createdAt: -1, updatedAt: -1 });

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
  confirmEmail,
  resendLink,
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
