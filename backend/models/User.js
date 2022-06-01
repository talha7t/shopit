const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
    },
    userEmail: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: [validator.isEmail, "Please enter valid email address"],
    },
    userPassword: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Password should have atleast 6 characters"],
      select: false,
    },
    userGender: {
      type: String,
      required: [true, "Please enter your password"],
      enum: {
        values: ["male", "female"],
        required: [true, "Please select a correct gender for the user"],
      },
    },
    userDateOfBirth: {
      type: Date,
      required: [true, "Please Provide your date of birth"],
    },
    userStatus: {
      type: String,
      required: [true, "Please provide a status for the user"],
      enum: {
        values: ["unblocked", "blocked", "warned"],
        required: [true, "Please select a correct status for the user"],
      },
      default: "unblocked",
    },
    userRole: {
      type: String,
      required: [true, "Please select a role for the user"],
      enum: {
        values: ["customer", "admin"],
        required: [true, "Please select a correct role for the user"],
      },
      default: "customer",
    },
    userAddress: {
      type: String,
      maxLength: [100, "User address cannot exceed 100 characters"],
      required: [true, "Please provide your address"],
    },
    userCity: {
      type: String,
      maxLength: [30, "User city cannot exceed 30 characters"],
      required: [true, "Please provide your city"],
    },
    userZipCode: {
      type: String,
      maxLength: [9, "Zip code cannot exceed 9 characters"],
      required: [true, "Please provide your zip code"],
    },
    userCountry: {
      type: String,
      maxLength: [30, "User country cannot exceed 30 characters"],
      required: [true, "Please provide your country"],
    },
    userContact: {
      type: String,
      maxLength: [15, "User contact cannot exceed 12 characters"],
      required: [true, "Please provide your Phone Number"],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// Encrypting passwords before registering/saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("userPassword")) {
    // run this if password is not modified
    next();
  }

  this.userPassword = await bcrypt.hash(this.userPassword, 10); // second argument is the salt value
});

// compare user passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.userPassword);
};

// Return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
