const express = require("express");
const router = express.Router({ mergeParams: true });
const Category = require("../models/Category");
const Product = require("../models/Product");
const errorHandler = require("../utils/errorHandler");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");

router.get("/:categoryId?", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    errorHandler(res, error);
  }
});

router.delete("/:categoryId", roleMiddleware(["ADMIN"]), async (req, res) => {
  try {
    const category = await Category.remove({
      _id: req.params.categoryId,
    });
    await Product.remove({
      category: req.params.categoryId,
    });
    res.status(200).json({ message: "Категория была удалена!" });
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
      const category = await Category.create({
        name: req.body.name,
        image: req.file ? req.file.path : "",
      });
      await category.save();
      res.status(201).json({ category, message: "Категория создана!" });
    } catch (error) {
      errorHandler(res, error);
    }
  }
);

router.patch(
  "/:categoryId",
  roleMiddleware(["ADMIN"]),
  upload.single("image"),
  async (req, res) => {
    const updated = {
      name: req.body.name,
    };

    if (req.file) {
      updated.image = req.file.path;
    } else {
      updated.image = "";
    }

    try {
      const category = await Category.findOneAndUpdate(
        { _id: req.params.categoryId },
        { $set: updated },
        { new: true }
      );
      res.status(200).json({ category, message: "Категория обновлена!" });
    } catch (error) {
      errorHandler(res, error);
    }
  }
);

module.exports = router;
