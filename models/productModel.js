const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add product name"],
    trim: true,
    maxLength: [100, "Product name must be less than 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "please add product price"],
    maxLength: [10, "Product name must be less than 10  characters"],
    deafult: 0.0,
  },
  description: {
    type: String,
    required: [true, "please add product description"],
    trim: true,
    maxLength: [100, "Product name must be less than 100 characters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please select a category for the product"],
    enum: {
      values: [
        "Electronics",
        "utensils",
        "computers",
        "beauty",
        "food",
        "Accessories",
      ],
      message: "Please specify correct category for the product",
    },
  },
  seller: {
    type: String,
    required: [true, "Please enter product seller"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [5, "product cannot exceed 5 characters"],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: [true, "please provie a review"],
      },
      rating: {
        type: Number,
        required: [true, "please provie a rating"],
      },
      comment: {
        type: String,
        required: [true, "please provie a comment on the product"],
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.virtual("fakePrice").get(function () {
  return this.price * 2;
});

module.exports = mongoose.model("product", productSchema);
