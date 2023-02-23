const express = require("express");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const isTokenInvalid = require("../utils/isTokenInvalid");
const tokenService = require("../services/token.service");
const router = express.Router({ mergeParams: true });
const errorHandler = require("../utils/errorHandler");

router.post("/signUp", [
  check("email", "Некорректный email").isEmail(),
  check("password", "Минимальная длина пароля 8 символов").isLength({ min: 8 }),
  check("name", "Минимальная длина имени должна 2 символа").isLength({
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
        return res.status(400).json({
          error: { message: "EMAIL_EXISTS", code: 400 },
        });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        ...req.body,
        password: hashPassword,
        role: "USER",
      });

      const tokens = tokenService.generate({
        _id: newUser._id,
        role: newUser.role,
      });
      await tokenService.save(newUser._id, tokens.refreshToken);

      res.status(201).send({ ...tokens, userId: newUser._id });
    } catch (error) {
      errorHandler(res, e);
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
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
          },
        });
      }

      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        return res.status(400).send({
          error: {
            message: "EMAIL_NOT_FOUND",
            code: 400,
          },
        });
      }

      const isPasswordEqual = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordEqual) {
        return res.status(400).send({
          error: {
            message: "INVALID_PASSWORD",
            code: 400,
          },
        });
      }

      const tokens = tokenService.generate(existingUser._id, existingUser.role);
      await tokenService.save(existingUser._id, tokens.refreshToken);

      res.status(200).send({ ...tokens, userId: existingUser._id });
    } catch (e) {
      errorHandler(res, e);
    }
  },
]);

router.post("/token", async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body;
    const data = tokenService.validateRefresh(refreshToken);
    const dbToken = await tokenService.findToken(refreshToken);

    if (isTokenInvalid(data, dbToken)) {
      return res.status(401).json({ message: "Unauthorize" });
    }

    const tokens = await tokenService.generate({
      id: data._id,
      role: data.role,
    });

    await tokenService.save(data._id, tokens.refreshToken);

    res.status(200).send({ ...tokens, userId: data._id });
  } catch (e) {
    errorHandler(res, e);
  }
});

module.exports = router;
