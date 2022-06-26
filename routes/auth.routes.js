const express = require("express");
const { signIn, signUp } = require("../controllers/auth.controllers");
const router = express.Router();
const { validateRegister } = require("../validation/user.validation");

router.post("/logIn", signIn);
router.post("/Register", validateRegister, signUp);
module.exports = router;
