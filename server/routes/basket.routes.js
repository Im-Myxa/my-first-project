const express = require("express");
const router = express.Router({ mergeParams: true });
const errorHandler = require("../utils/errorHandler");
const auth = require("../middleware/authMiddleware");
const Basket = require("../models/Basket");

router.post("/:userId", auth, async (req, res) => {
  const { productId, name, quantity, price, image } = req.body;
  const { userId } = req.params;

  if (userId === req.user) {
    return res.status(403).json({ message: "У вас нет доступа!" });
  }

  try {
    const basket = await Basket.findOne({ user: userId });

    if (basket) {
      const itemIndex = basket.products.findIndex(
        (p) => p.productId == productId
      );

      if (itemIndex > -1) {
        const productItem = basket.products[itemIndex];
        productItem.quantity += 1;
        basket.products[itemIndex] = productItem;
      } else {
        basket.products.push({
          productId,
          quantity,
          name,
          price,
          image,
        });
      }

      await basket.save();
      return res.status(201).json({ productId, products: basket.products });
    } else {
      const newBasket = await Basket.create({
        user: userId,
        products: [
          {
            productId,
            quantity,
            name,
            price,
            image,
          },
        ],
      });

      await newBasket.save();
      return res.status(201).json({ product: newBasket.products[0] });
    }
  } catch (error) {
    errorHandler(res, error);
  }
});

router.get("/:userId", auth, async (req, res) => {
  const { userId } = req.params;

  if (userId === req.user) {
    return res.status(403).json({ message: "У вас нет доступа!" });
  }
  try {
    const basket = await Basket.findOne({ user: userId });
    if (!basket) return res.status(200).json({ message: "Корзина пустая" });

    res.status(200).json(basket);
  } catch (error) {
    errorHandler(res, error);
  }
});

router.patch("/:userId", auth, async (req, res) => {
  const { productId } = req.body;
  const { userId } = req.params;

  if (userId === req.user) {
    return res.status(403).json({ message: "У вас нет доступа!" });
  }

  try {
    const basket = await Basket.findOne({ user: userId });
    if (!basket) return res.status(200).json({ message: "Корзина пустая" });
    const itemIndex = basket.products.findIndex(
      (p) => p.productId == productId
    );

    if (itemIndex > -1) {
      const productItem = basket.products[itemIndex];
      if (productItem.quantity === 1) {
        basket.products.splice(itemIndex, 1);
      } else {
        productItem.quantity -= 1;
        basket.products[itemIndex] = productItem;
      }
      await basket.save();
      res.status(200).json(basket.products[itemIndex]);
    }
  } catch (error) {
    errorHandler(res, error);
  }
});

router.delete("/:productId?", auth, async (req, res) => {
  const { productId } = req.params;

  try {
    const basket = await Basket.findOne({ user: req.user.id });

    if (!basket) return res.status(200).json({ message: "Корзина пустая!" });

    if (productId) {
      const itemIndex = basket.products.findIndex(
        (p) => p.productId == productId
      );

      if (itemIndex > -1) {
        const removed = basket.products[itemIndex];
        basket.products.splice(itemIndex, 1);
        await basket.save();
        res.status(200).json({ removed, message: "Удален" });
      }
    } else {
      basket.products.splice(0);
      await basket.save();
      res.status(200).json({ message: `Корзина пустая!` });
    }
  } catch (error) {}
});

module.exports = router;
