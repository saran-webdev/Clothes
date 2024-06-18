const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../model/user.model");

const generateRandomKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

// Function to handle addToCart action
const addToCart = async (userId, productId) => {
  console.log("<><><> ADDEDCART", userId, productId);
  try {
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return {
        success: false,
        message: "User not found"
      };
    }
    const existingCartItemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );
    console.log("<><> line:no19", existingCartItemIndex);
    if (existingCartItemIndex !== -1) {
      return {
        success: false,
        message: "Item already added in the cart"
      };
    } else {
      user.cart.push({ productId });
      await user.save();
      return {
        success: true,
        message: "Item added to cart successfully"
      };
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return { success: false, message: "Failed to add item to cart" };
  }
};

router.post("/cart/add", async (req, res) => {
  try {
    const { productId, userId } = req.body;

    const result = await addToCart(userId, productId);
    if (result.success) {
      res.json({ message: result.message });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Function to handle removeFromCart action
const removeFromCart = async (userId, productId) => {
  try {
    // Find the user by ID
    const user = await User.findById(userId);

    // Filter out the product from the cart
    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId.toString()
    );

    // Save the updated user document
    await user.save();

    return { success: true, message: "Item removed from cart successfully" };
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return { success: false, message: "Failed to remove item from cart" };
  }
};

const jwtSecretKey = generateRandomKey();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body; // Make sure to include 'email' here
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword }); // Include 'email' here
    await newUser.save();
    res.status(201).send("USER REGISTERED SUCCESSFULLY");
  } catch (error) {
    console.error(error);
    res.status(500).send("ERROR REGISTERING USER");
  }
});

// Remove item from cart
router.delete("/remove/:userId/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.params.userId;
    const result = await removeFromCart(userId, productId);
    if (result.success) {
      res.json({ message: result.message });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
// module.exports = router;

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Create user data object without sensitive information
        const userData = {
          _id: user._id,
          username: user.username,
          email: user.email
          // Add other properties as needed
        };

        // Generate JWT token with entire user data
        const token = jwt.sign(userData, jwtSecretKey, {
          expiresIn: "1h"
        });
        res.json({ token, user });
      } else {
        res.status(401).send("INVALID CREDENTIALS");
      }
    } else {
      res.status(401).send("INVALID CREDENTIALS");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("ERROR LOGGING IN");
  }
});

router.get("/cart-get/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const singleUserData = await User.findById(userId).populate({
      path: "cart.productId",
      model: "Product" // Assuming your product model is named "Product"
    });
    res.json(singleUserData.cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const singleUserData = await User.findById(userId);
    res.send({
      success: true,
      message: "Data Recived Success",
      userData: singleUserData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/cart/update/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the product exists in the user's cart
    const cartItemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (cartItemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Update the quantity of the product
    user.cart[cartItemIndex].quantity = quantity;

    // Save the updated user object
    await user.save();

    res.status(200).json({ message: "Quantity updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
