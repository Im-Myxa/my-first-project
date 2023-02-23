const express = require("express");
const router = express.Router({ mergeParams: true });
const Service = require("../models/Service");
const errorHandler = require("../utils/errorHandler");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");

router.get("/:masterId?/:serviceId?", async (req, res) => {
  try {
    if (req.params.serviceId) {
      const service = await Service.findById(req.params.serviceId);
      res.status(200).json(service);
    } else if (req.params.masterId) {
      const services = await Service.find({
        master: req.params.masterId,
      });
      res.status(200).json(services);
    } else {
      const services = await Service.find();
      res.status(200).json(services);
    }
  } catch (error) {
    errorHandler(res, error);
  }
});

router.post(
  "/",
  upload.single("image"),
  roleMiddleware(["ADMIN"]),
  async (req, res) => {
    try {
      const service = await Service.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        master: req.body.master,
        image: req.file ? req.file.path : "",
      });
      await service.save();
      res.status(201).json(service);
    } catch (error) {
      errorHandler(res, error);
    }
  }
);

router.patch(
  "/:serviceId",
  roleMiddleware(["ADMIN"]),
  upload.single("image"),
  async (req, res) => {
    const updated = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      master: req.body.master,
    };

    if (req.file) {
      updated.image = req.file.path;
    } else {
      updated.image = "";
    }

    try {
      const service = await Service.findOneAndUpdate(
        { _id: req.params.serviceId },
        { $set: updated },
        { new: true }
      );
      res.status(200).json(service);
    } catch (error) {
      errorHandler(res, error);
    }
  }
);

router.delete("/:serviceId", roleMiddleware(["ADMIN"]), async (req, res) => {
  try {
    await Service.remove({
      _id: req.params.serviceId,
    });
    res.status(200).json({ message: `Услуга была удалена!` });
  } catch (error) {
    errorHandler(res, error);
  }
});

module.exports = router;
