const express = require("express");
const validate = require("../middlewares/validate.middleware");
const { signUpSchema, loginSchema } = require("../validations/auth.validation");
const { signUp, login } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/signup", validate(signUpSchema), signUp);
router.post("/login", validate(loginSchema), login);

module.exports = router;
