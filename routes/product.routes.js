const express = require("express");
const {
	addProduct,
	getProduct,
} = require("../controllers/product.controllers");

const router = express.Router();
const { verifyAdmin } = require("../middleware/auth");
const { validateProduct } = require("../validation/product.validation");

router.post("/addProduct", verifyAdmin, validateProduct, addProduct);
router.get("/getListProduct", getProduct);
module.exports = router;
