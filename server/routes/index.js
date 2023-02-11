const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/feedback", require("./feedback.routes"));
router.use("/product", require("./product.routes"));
router.use("/service", require("./service.routes"));
router.use("/user", require("./user.routes"));

module.exports = router;
