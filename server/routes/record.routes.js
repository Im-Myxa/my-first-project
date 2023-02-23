const express = require("express");
const router = express.Router({ mergeParams: true });
const Record = require("../models/Record");
const role = require("../middleware/roleMiddleware");
const auth = require("../middleware/authMiddleware");
const errorHandler = require("../utils/errorHandler");

router.get("/", role(["ADMIN"]), async (req, res) => {
  try {
    const records = await Record.find()
      .sort({ date: -1 })
      .skip(+req.query.offset)
      .limit(+req.query.limit);

    res.status(200).json(records);
  } catch (error) {
    errorHandler(res, error);
  }
});

router.get("/:userId", auth, async (req, res) => {
  try {
    if (req.params.userId === req.user._id) {
      const records = await Order.find({
        user: req.user._id,
      });
      res.status(200).json(records);
    } else {
      return res.status(403).json({ message: "У вас нет доступа!" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const lastRecord = await Order.find().sort({ date: -1 });
    const maxRecord = lastRecord ? lastRecord.record : 0;
    const record = await Record.create({
      date: req.body.date,
      record: maxRecord + 1,
      service: req.body.service,
      user: req.user._id,
    });

    await record.save();

    res.status(201).json(record);
  } catch (error) {
    errorHandler(res, error);
  }
});
module.exports = router;
