//create and send token and save in the cookie
const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  //options for cookie
  const oneDay = 1000 * 60 * 60 * 24;
  const options = {
    expires: new Date(Date.now() + oneDay),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

// process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000

module.exports = sendToken;
