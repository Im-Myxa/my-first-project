const express = require("express");
const router = express.Router({ mergeParams: true });
const Master = require("../models/Master");
const Service = require("../models/Service");
const errorHandler = require("../utils/errorHandler");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");

router.get("/:masterId?", async (req, res) => {
  try {
    if (req.params.masterId) {
      const master = await Master.findById(req.params.masterId);
      res.status(200).json(master);
    } else {
      const masters = await Master.find();
      res.status(200).json(masters);
    }
  } catch (error) {
    errorHandler(res, error);
  }
});

router.delete("/:masterId", roleMiddleware(["ADMIN"]), async (req, res) => {
  try {
    await Master.remove({
      _id: req.params.masterId,
    });
    await Service.remove({
      master: req.params.masterId,
    });
    res.status(200).json({ message: "Мастер был удален!" });
  } catch (error) {
    errorHandler(res, error);
  }
});

router.post(
  "/",
  roleMiddleware(["ADMIN"]),
  upload.single("image"),
  async (req, res) => {
    try {
      const master = await Master.create({
        name: req.body.name,
        description: req.body.description,
        image: req.file ? req.file.path : "",
      });
      await master.save();
      res.status(201).json(master);
    } catch (error) {
      errorHandler(res, error);
    }
  }
);

router.patch(
  "/:masterId",
  roleMiddleware(["ADMIN"]),
  upload.single("image"),
  async (req, res) => {
    const updated = {
      name: req.body.name,
      description: req.body.description,
    };
    if (req.file) {
      updated.image = req.file.path ?? "";
    }
    try {
      const master = await Master.findOneAndUpdate(
        { _id: req.params.masterId },
        { $set: updated },
        { new: true }
      );
      res.status(200).json(master);
    } catch (error) {
      errorHandler(res, error);
    }
  }
);

module.exports = router;
