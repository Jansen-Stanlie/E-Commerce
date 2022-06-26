const express = require("express");
const balanceController = require("../controllers/balance.controllers");
const router = express.Router();
const { verifyAdmin } = require("../middleware/auth");

router.put("/topUp", verifyAdmin, balanceController.topUpBalance);

module.exports = router;
