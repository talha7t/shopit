const ErrorHandler = require("../utilities/ErrorHandler");

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  // handling development errors
  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  // handling production errors
  if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    // wrong mongoose Object ID error
    if (err.name === "CastError") {
      const message = `Resource not Found. Invalid: ${err}`;
      // const message = `Resource not Found. Invalid: ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    //Handling Mongoose Valiidation Error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    // Handling mongoose duplicate key error
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new ErrorHandler(message, 400);
    }

    // Handling wrong jwt error
    if (err.name === "JsonWebTokenError") {
      const message = "JSON Web Token is invalid, try again";
      error = new ErrorHandler(message, 400);
    }

    // Handling expired jwt error
    if (err.name === "TokenExpiredError") {
      const message = "JSON Web Token is expired, try again";
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message || "internal server error",
    });
  }
};

module.exports = errorHandler;
