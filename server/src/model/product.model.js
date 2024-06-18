const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true
    },
    productId: {
      type: String,
      required: true,
      unique: true
    },
    productImage: String,
    productPrice: {
      type: Number,
      required: true,
      min: 0
    },
    description: String,
    category: {
      type: String,
      required: true,
      enum: ["men", "women", "kids"]
    },
    stock: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
