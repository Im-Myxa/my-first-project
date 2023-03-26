const express = require("express");
const router = express.Router({ mergeParams: true });
const Order = require("../models/Order");
const errorHandler = require("../utils/errorHandler");
const role = require("../middleware/roleMiddleware");
const auth = require("../middleware/authMiddleware");

router.get("/", role(["ADMIN"]), async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    // .skip(+req.query.offset)
    // .limit(+req.query.limit);

    res.status(200).json(orders);
  } catch (error) {
    errorHandler(res, error);
  }
});

router.get("/:userId", auth, async (req, res) => {
  try {
    if (req.params.userId === req.user.id) {
      const orders = await Order.find({
        user: req.user.id,
      });
      res.status(200).json(orders);
    } else {
      return res.status(403).json({ message: "У вас нет доступа!" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    if (req.body.userId === req.user.id) {
      const lastOrder = await Order.find().sort({ date: -1 });

      let maxOrder = lastOrder[0] ? lastOrder[0].order : 0;

      const newOrder = await Order.create({
        list: req.body.products,
        user: req.user.id,
        order: maxOrder + 1,
        costOrder: req.body.sumOrder,
      });

      await newOrder.save();

      res.status(201).json({ newOrder, message: "Заказ создан!" });
    } else {
      return res.status(403).json({ message: "У вас нет доступа!" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
});

module.exports = router;
