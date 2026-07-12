const express = require("express");
const validate = require("../middlewares/validate.middleware");
const { signUpSchema, loginSchema } = require("../validations/auth.validation");
const {
  signUp,
  login,
  refresh,
  logOut,
} = require("../controllers/auth.controller");
const router = express.Router();

router.post("/signup", validate(signUpSchema), signUp);
router.post("/login", validate(loginSchema), login);

router.post("/refresh", refresh);
router.post("/logout", logOut);

module.exports = router;
