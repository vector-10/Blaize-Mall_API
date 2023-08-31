const User = require("../models/userModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//Register a user => /api/v3/register
const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  //To make sure passwords match on registration
  if (password !== confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 403));
  }

  // To make sure no duplicate emails exist in the database
  const userEmailAlreadyExists = await User.findOne({ email });
  if (userEmailAlreadyExists) {
    return next(
      new ErrorHandler("Account with this email already exists", 400)
    );
  }

  // Assign admin role to the very first registered user
  const theFirstAccount = (await User.countDocuments({})) === 0;
  const role = theFirstAccount ? "admin" : "user";

  const user = await User.create({
    name,
    email,
    password,
    role,
    avatar: {
      public_id: "avatars/kccvibpsuiusmwfepb3m",
      url: "https://res.cloudinary.com/dz3z6fbn8/image/upload/v1606305757/avatars/kccvibpsuiusmwfepb3m.png",
    },
  });
  // console.log(req.body)
  setTimeout(() => {
    sendToken(user, 201, res);
  }, 3000);
});

//Login User => /api/v3/login
const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  // checks if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }
  // finding user in database
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  // console.log(user)

  //check if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  setTimeout(() => {
    sendToken(user, 200, res);
  }, 3000);
});

// password recovery email
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User with this email is not found", 404));
  }

  // get reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  //create rest password url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v3/password/reset/${resetToken}`;

  const message = ` Your password reset token is as follows: \n\n${resetUrl}
    \n\n If you have not requested this email,then ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: "ecommerce password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// reset password for user
const resetPassword = catchAsyncErrors(async (req, res, next) => {
  //Hash the url token
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
        "Password reset token is invalid or has been expires",
        400
      )
    );
  }

  if (req.body.password != req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  //setup new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});

// Get currently logged in user details => /api/v3/me
const getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//update password  => /api/v3/password/update
const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  //chaeck previous user password
  const isMatched = await user.comparePassword(req.body.oldPassword);

  if (!isMatched) {
    return next(new ErrorHandler("old password is incorrect", 400));
  }
  user.password = req.body.password;
  await user.save();

  sendToken(user, 200, res);
});

//update user profile /api/v3/me/update
const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const userUpdated = {
    name: req.body.name,
    email: req.body.email,
  };

  //update avatar
  await User.findByIdAndUpdate(req.user.id, userUpdated, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//Logout User => /api/v3/logout
const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "You are successfully logged out!",
  });
});

// Admin Routes

//Get all users => /api/v3/admin/users
const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get user details
const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User not found with id: ${req.params.id}`));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//update user profile /api/v3/admin/update/:id
const updateUser = catchAsyncErrors(async (req, res, next) => {
  const newUserDate = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  //update avatar
  const user = await User.findByIdAndUpdate(req.params.id, newUserDate, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User not found with id: ${req.params.id}`));
  }

  //Remove avatar from cloudinary

  await user.remove();

  res.status(200).json({
    success: true,
    user,
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  updateUser,
  getUserDetails,
  getAllUsers,
  deleteUser,
};
