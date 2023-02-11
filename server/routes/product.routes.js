const express = require("express");
const Product = require("../models/Product");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  // try {
  //   const listProducts = await Product.find();
  //   res.status(200).send(listProducts);
  // } catch (error) {
  //   res.status(500).json({
  //     message: "На сервере произошла ошибка. Попробуйте позже!",
  //   });
  // }
});
router.post("/", async (req, res) => {});
router.patch("/:id", async (req, res) => {});
router.delete("/:id", async (req, res) => {});

module.exports = router;
