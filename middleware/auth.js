const User             = require('../models/userModel');
const jwt              = require('jsonwebtoken');
const ErrorHandler     = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

// checks to see if user if authenticated or not
const authenticatedUser = catchAsyncErrors( async (req, res, next) => {
    const { token } = req.cookies;
    if(!token) {
        return next(new ErrorHandler('Login first to access this resource.', 401))
    }

    const decoded = jwt.verify( token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);
  
})

//Handling users roles
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.roles)){
            return next(
            new ErrorHandler(`Role (${req.user.roles}) is not allowed to access this resource`, 403)) 
        }

        next();
    }
}



module.exports = {authenticatedUser, authorizeRoles}