const express = require("express");
const router = express.Router();

const auth = require("./auth.routes");
const topUp = require("./balance.routes");
const product = require("./product.routes");
const history = require("./history.routes");

router.use("/history", history);
router.use("/auth", auth);
router.use("/balance", topUp);
router.use("/product", product);

module.exports = router;
