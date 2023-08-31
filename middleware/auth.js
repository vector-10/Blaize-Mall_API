const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

// checks to see if user if authenticated or not to access a resource
const authenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  console.log(req.cookies);
  if (!token) {
    return next(new ErrorHandler("Login first to access this resource.", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(token);
  req.user = await User.findById(decoded.id);
  console.log(decoded.id);
  next();
});

//Handling users roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

// const authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     const userRole = req.user.role;

//     console.log(userRoles);
//     const allowedAccess = roles.some((role) => userRoles.includes(role));
//     if (!allowedAccess) {
//       return next(
//         new ErrorHandler(
//           `Role (${userRole}) is not allowed to access this resource`,
//           403
//         )
//       );
//     }
//     console.log(req.user);
//     next();
//   };
// };

module.exports = { authenticatedUser, authorizeRoles };
