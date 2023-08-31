const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

// checks to see if user if authenticated or not
const authenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  //   console.log(token);
  if (!token) {
    return next(new ErrorHandler("Login first to access this resource.", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  console.log(req.user);
  next();
});

//Handling users roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const userRoles = req.user.roles;
    console.log(req.user);
    const allowedAccess = roles.some((role) => userRoles.includes(role));
    if (!allowedAccess) {
      return next(
        new ErrorHandler(
          `Role (${userRoles}) is not allowed to access this resource`,
          403
        )
      );
    }
    console.log(req.user);
    next();
  };
};

module.exports = { authenticatedUser, authorizeRoles };
