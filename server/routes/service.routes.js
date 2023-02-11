const express = require("express");
const router = express.Router({ mergeParams: true });
const Service = require("../models/Service");

router.get("/", async (req, res) => {
  // try {
  //   const listService = await Service.find();
  //   res.status(200).send(listService);
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
