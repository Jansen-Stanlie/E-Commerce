const express = require("express");
const {
	addProduct,
	getProduct,
} = require("../controllers/product.controllers");

const router = express.Router();
const { verifyAdmin } = require("../middleware/auth");

router.post("/addProduct", verifyAdmin, addProduct);
router.get("/getListProduct", getProduct);
module.exports = router;
