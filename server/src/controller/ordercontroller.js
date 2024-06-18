// Get Unique User Order Items
/* app.get(
  "/api/admin/orders/:userId/total",
  async (req, res) => {
    try {
      const totalOrders = await Order.aggregate([
        {
          $match: {
            user: mongoose.Types.ObjectId(req.params.userId)
          }
        },
        {
          $group: {
            _id: null,
            totalItems: { $sum: { $size: "$products" } },
            totalPrice: { $sum: "$totalPrice" }
          }
        }
      ]);

      if (totalOrders.length > 0) {
        res.json(totalOrders[0]);
      } else {
        res.status(404).json({ error: "User or orders not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
); */

// Get all orders for a specific user
router.get("/api/admin/orders/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate(
      "user products.productId"
    );
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update an order
router.put("/api/admin/orders/:userId/:orderId", async (req, res) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: req.params.orderId, user: req.params.userId },
      req.body,
      { new: true }
    ).populate("user products.productId");
    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete an order
router.delete("/api/admin/orders/:userId/:orderId", async (req, res) => {
  try {
    const deletedOrder = await Order.findOneAndDelete({
      _id: req.params.orderId,
      user: req.params.userId
    });
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
