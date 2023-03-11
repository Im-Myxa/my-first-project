const express = require("express");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const tokenService = require("../services/token.service");
const router = express.Router({ mergeParams: true });
const errorHandler = require("../utils/errorHandler");
const checkAuth = require("../middleware/checkAuth");

router.post("/signUp", [
  check("email", "Некорректный email").isEmail(),
  check("password", "Минимальная длина пароля 8 символов").isLength({ min: 8 }),
  check("name", "Минимальная длина имени должна быть 2 символа").isLength({
    min: 2,
  }),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
            errors: errors.array(),
          },
        });
      }
      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.json({
          message: "Пользователь с таким email уже существует",
        });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        ...req.body,
        password: hashPassword,
        role: "USER",
      });

      const tokens = tokenService.generate({
        _id: user._id,
        role: user.role,
      });
      await tokenService.save(user._id, tokens.refreshToken);
      await user.save();

      res.status(201).json({
        token: tokens.refreshToken,
        user,
        message: "Регистрация прошла успешно",
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
]);

router.post("/signIn", [
  check("email", "Email некорректный").normalizeEmail().isEmail(),
  check("password", "Пароль не может быть пустым").exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({
          message: "Неверный email или пароль.",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.json({
          message: "Такой email не существует.",
          code: 400,
        });
      }

      const isPasswordEqual = await bcrypt.compare(password, user.password);

      if (!isPasswordEqual) {
        return res.json({
          message: "Неверный email или пароль.",
          code: 400,
        });
      }

      const tokens = tokenService.generate(user._id, user.role);
      await tokenService.save(user._id, tokens.refreshToken);

      res.status(200).json({
        token: tokens.refreshToken,
        user,
        message: "Вы вошли в систему.",
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
]);

router.get("/me", checkAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({
        message: "Такого пользователя не существует.",
      });
    }

    const tokens = await tokenService.generate({
      id: user._id,
      role: user.role,
    });

    res.json({
      user,
      token: tokens.refreshToken,
    });
  } catch (error) {
    errorHandler(res, error);
  }
});

module.exports = router;
