const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/User");
const role = require("../middleware/roleMiddleware");
const auth = require("../middleware/authMiddleware");
const errorHandler = require("../utils/errorHandler");

router.get("/", role(["ADMIN"]), async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    errorHandler(res, error);
  }
});
router.get("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.user._id) {
      const user = await User.findById(userId);
      res.json(user);
    } else {
      res.json({ message: "Пользователь не авторизован" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
});

router.patch("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      res.json(updatedUser);
    } else {
      res.json({ message: "Пользователь не авторизован" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
});

module.exports = router;
