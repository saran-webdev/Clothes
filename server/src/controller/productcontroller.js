const router = require("express").Router();
const productDataModel = require("../model/product.model");

// GET ALL PRODUCT DATA
router.get("/product-get", async (req, res) => {
  try {
    const products = await productDataModel.find();
    res.send(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST PRODUCT DATA
router.post("/product-post", async (req, res) => {
  const {
    productName,
    productId,
    productImage,
    productPrice,
    description,
    category,
    stock
  } = req.body;
  try {
    const newProduct = new productDataModel({
      productName,
      productId,
      productImage,
      productPrice,
      description,
      category,
      stock
    });
    await newProduct.save();
    res.status(200).send("Data Posted");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET UNIQUE PRODUCT DATA
router.get("/api/products/:Id", async (req, res) => {
  try {
    const product = await productDataModel.findById(req.params.productId);
    if (product) {
      res.send(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// PRODUCT UPDATE DATA
router.put("/product-update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const {
      productName,
      productId,
      productImage,
      productPrice,
      description,
      category,
      stock
    } = req.body;

    const updatedProduct = await productDataModel.findByIdAndUpdate(
      id,
      {
        productName,
        productId,
        productImage,
        productPrice,
        description,
        category,
        stock
      },
      { new: true }
    ); // Ensure that the updated document is returned

    if (updatedProduct) {
      res.send(updatedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PRODUCT DELETE DATA

router.delete("/product-delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await productDataModel.findByIdAndDelete(id);
    if (deletedProduct) {
      res.send("Data Deleted");
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// UNIQUE CATEGORIES

router.get("/uniqueCategories/men", async (req, res) => {
  try {
    const uniqueCategories = await productDataModel.distinct("category", {
      category: "men"
    });
    res.json(uniqueCategories);
  } catch (error) {
    console.error("Error fetching unique categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
