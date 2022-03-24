// Create and send token and save in the database

const sendToken = (user, statusCode, res) => {
  // Create jwt token

  const token = user.getJwtToken();

  // options for cookies
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, user, token });
};

module.exports = sendToken;

// http only cookie can not be accessed by javascript so it is a secure way to store cookies instead of local storage
