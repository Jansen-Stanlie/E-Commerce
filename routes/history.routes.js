const express = require("express");
const { verify } = require("jsonwebtoken");
const {
	purchaseItem,
	getHistory,
} = require("../controllers/history.controllers");
const { validatePurchase } = require("../validation/purchase.validation");

const router = express.Router();
const { tokenVerify } = require("../middleware/auth");
router.post("/purchase", tokenVerify, validatePurchase, purchaseItem);
router.get("/getHistory", tokenVerify, getHistory);

module.exports = router;
