const express = require("express");
const router = express.Router({ mergeParams: true });
const FeedBackProduct = require("../models/FeedBackProduct");
const role = require("../middleware/roleMiddleware");
const auth = require("../middleware/authMiddleware");
const errorHandler = require("../utils/errorHandler");

router.get("/", async (req, res) => {
  try {
    const { orderBy, equalTo } = req.query;
    const list = await FeedBackProduct.find({
      [orderBy]: equalTo,
    });
    res.json(list);
  } catch (error) {
    errorHandler(res, error);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const newFBProduct = await FeedBackProduct.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).json(newFBProduct);
  } catch (error) {
    errorHandler(res, error);
  }
});

router.delete("/:id", role(["ADMIN"]), async (req, res) => {
  try {
    const removeFBProduct = await FeedBackProduct.findById(req.params.id);
    await removeFBProduct.remove();
    res.status(200).json({ message: "Комментарий был удален!" });
  } catch (error) {
    errorHandler(res, error);
  }
});

module.exports = router;
