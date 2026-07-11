const express = require("express");
const validate = require("../middlewares/validate.middleware");
const verifyJwt = require("../middlewares/verifyJwt");
const verifyRole = require("../middlewares/verifyRole");
const { createProductSchema } = require("../validations/product.validation");
const { createProduct } = require("../controllers/product.controller");
const router = express.Router();

router.use(verifyJwt);
router.post(
  "/",
  verifyRole("ADMIN"),
  validate(createProductSchema),
  createProduct,
);

module.exports = router;
