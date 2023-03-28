const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/User");
const role = require("../middleware/roleMiddleware");
const auth = require("../middleware/authMiddleware");
const errorHandler = require("../utils/errorHandler");

router.get("/:userId", auth, async (req, res) => {
  const id = req.user.id._id? req.user.id._id : req.user.id

  try {
    const { userId } = req.params;

    if (userId === id) {
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
  const id = req.user.id._id? req.user.id._id : req.user.id
  try {
    const { userId } = req.params;

    if (userId === id) {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        {
          new: true,
        }
      );
      res
        .status(200)
        .json({ updatedUser, message: "Изменения прошли успешно!" });
    } else {
      res.json({ message: "Пользователь не авторизован!" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
});

module.exports = router;
