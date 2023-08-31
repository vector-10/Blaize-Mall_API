const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  getOneProduct,
  updateOneProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");

const { authenticatedUser, authorizeRoles } = require("../middleware/auth");

//get requests
router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getOneProduct);

// post requests
router.route("/product/new").post(createProduct);

//put requests
router
  .route("/admin/product/:id")
  .put(authenticatedUser, authorizeRoles("admin"), updateOneProduct)
  .delete(authenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/review").put(authenticatedUser, createProductReview);
router.route("/reviews").get(authenticatedUser, getProductReviews);

router.route("/reviews").delete(authenticatedUser, deleteReview);

module.exports = router;
