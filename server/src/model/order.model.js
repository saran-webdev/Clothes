const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        }
      }
    ],
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

// Calculate total price based on associated product prices
orderSchema.methods.calculateTotalPrice = async function () {
  const products = await Promise.all(
    this.products.map(async (product) => {
      const fetchedProduct = await Product.findById(product.productId);
      return fetchedProduct.productPrice * product.quantity;
    })
  );
  return products.reduce((total, price) => total + price, 0);
};

module.exports = Order;
