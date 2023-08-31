const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
//const cloudinary = require("../utils/cloudinary");

//create new product => /api/v3/product/new

const createProduct = catchAsyncErrors(async (req, res, next) => {
  // const { name, price, description, images, category } = req.body;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// get all products => /api/v3/products?keyword=apple
const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultsPerPage = 10;
  const productsCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);

  const products = await apiFeatures.query;
  setTimeout(() => {
    res.status(200).json({
      success: true,
      products,
      count: products.length,
      productsCount,
      resultsPerPage,
    });
  }, 3000);
});

// get single product => api/v3/product/_id
const getOneProduct = catchAsyncErrors(async (req, res, next) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  // console.log(product.fakePrice);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// update single product => api/v3/admin/product/_id
const updateOneProduct = catchAsyncErrors(async (req, res, next) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// delete single product => api/v3/admin/product/_id
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndDelete({ _id: productId });

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  // await product.remove();
  res.status(200).json({
    success: true,
    message: "Product successfully deleted",
  });
});

// create new review => /api/v3/review
const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get product reviews => /api/v3/reviews

const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// delete product reviews => api/v3/reviews

const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await Product.findByIdAndUpdate(
    req.query.id,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

module.exports = {
  getAllProducts,
  createProduct,
  getOneProduct,
  updateOneProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
};
