const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const path = require("path");

const mongoose = require("./src/config/db");

// CONTROLLER
const userController = require("./src/controller/usercontroller");
const productController = require("./src/controller/productcontroller");
// const orderController = require("./src/controller/ordercontroller");
// CROS ORIGN
app.use(
  cors({
    origin: [
      "http://localhost:5000",
      "http://localhost:3000",
      "https://cloths-saran.koyeb.app"
    ],
    credentials: true
  })
);
// BODY-PARSER
app.use(bodyParser.json());
// PORT
const PORT = process.env.PORT || 5000;

app.use("/", userController);
app.use("/", productController);
// app.use("/", orderController);

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("/*", (req, res) => {
res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// DEV INFO
app.listen(PORT, () => {
  console.log(`Server listening at the PORT: ${PORT}`);
});
