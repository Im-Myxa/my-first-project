const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/categories", require("./category.routes"));
router.use("/masters", require("./master.routes"));
router.use("/productFeedback", require("./prodFeedback.routes"));
router.use("/serviceFeedback", require("./serviceFeedback.routes"));
router.use("/products", require("./product.routes"));
router.use("/services", require("./service.routes"));
router.use("/user", require("./user.routes"));
router.use("/orders", require("./order.routes"));
router.use("/records", require("./record.routes"));

module.exports = router;
