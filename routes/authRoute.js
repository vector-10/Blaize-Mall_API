const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  getAllUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} = require("../controllers/authController");

const { authenticatedUser, authorizeRoles } = require("../middleware/auth");

//register new user
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

// get request logout
router.route("/logout").get(logoutUser);

// get user user profile
router.route("/me").get(authenticatedUser, getUserProfile);
router.route("/password/update").put(authenticatedUser, updatePassword);
router.route("/me/update").put(authenticatedUser, updateProfile);

router
  .route("admin/users")
  .get(authenticatedUser, authorizeRoles("admin"), getAllUsers);

router
  .route("admin/users/:id")
  .get(authenticatedUser, authorizeRoles("admin"), getUserDetails)
  .put(authenticatedUser, authorizeRoles("admin"), updateUser)
  .delete(authenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
