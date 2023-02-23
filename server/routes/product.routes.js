const express = require("express");
const router = express.Router({ mergeParams: true });
const Product = require("../models/Product");
const errorHandler = require("../utils/errorHandler");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");

router.get("/:categoryId?/:productId?", async (req, res) => {
  try {
    if (req.params.productId) {
      const product = await Product.findById(req.params.productId);
      res.status(200).json(product);
    } else if (req.params.categoryId) {
      const products = await Product.find({
        category: req.params.categoryId,
      });
      res.status(200).json(products);
    } else {
      const products = await Product.find();
      res.status(200).json(products);
    }
  } catch (error) {
    errorHandler(res, error);
  }
});

router.post(
  "/",
  upload.single("image"),
  roleMiddleware(["ADMIN"]),
  async (req, res) => {
    try {
      const product = await Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: req.file ? req.file.path : "",
      });
      await product.save();

      res.status(201).json(product);
    } catch (error) {
      errorHandler(res, error);
    }
  }
);

router.patch(
  "/:productId",
  roleMiddleware(["ADMIN"]),
  upload.single("image"),
  async (req, res) => {
    const updated = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
    };

    if (req.file) {
      updated.image = req.file.path;
    } else {
      updated.image = "";
    }

    try {
      const product = await Product.findOneAndUpdate(
        { _id: req.params.productId },
        { $set: updated },
        { new: true }
      );
      res.status(200).json(product);
    } catch (error) {
      errorHandler(res, error);
    }
  }
);

router.delete("/:productId", roleMiddleware(["ADMIN"]), async (req, res) => {
  try {
    await Product.remove({ _id: req.params.productId });
    res.status(200).json({ message: `Продукт был удален!` });
  } catch (error) {
    errorHandler(res, error);
  }
});

module.exports = router;
