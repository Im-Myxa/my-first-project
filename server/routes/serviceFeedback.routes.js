const express = require("express");
const router = express.Router({ mergeParams: true });
const FeedBackService = require("../models/FeedBackService");
const role = require("../middleware/roleMiddleware");
const auth = require("../middleware/authMiddleware");
const errorHandler = require("../utils/errorHandler");

router.get("/", async (req, res) => {
  try {
    const { orderBy, equalTo } = req.query;
    const list = await FeedBackService.find({
      [orderBy]: equalTo,
    });
    res.json(list);
  } catch (error) {
    errorHandler(res, error);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const newFBService = await FeedBackService.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).json(newFBService);
  } catch (error) {
    errorHandler(res, error);
  }
});

router.delete("/:id", role(["ADMIN"]), async (req, res) => {
  try {
    const removeFBService = await FeedBackService.findById(req.params.id);
    await removeFBService.remove();
    res.status(200).json({ message: "Комментарий был удален!" });
  } catch (error) {
    errorHandler(res, error);
  }
});

module.exports = router;
