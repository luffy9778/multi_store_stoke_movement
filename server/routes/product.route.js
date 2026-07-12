const express = require("express");
const validate = require("../middlewares/validate.middleware");
const verifyJwt = require("../middlewares/verifyJwt");
const verifyRole = require("../middlewares/verifyRole");
const {
  createProductSchema,
  getProductsSchema,
} = require("../validations/product.validation");
const {
  createProduct,
  getProducts,
} = require("../controllers/product.controller");
const router = express.Router();

router.use(verifyJwt);
router.post(
  "/",
  verifyRole("ADMIN"),
  validate(createProductSchema),
  createProduct,
);
router.get("/", validate(getProductsSchema), getProducts);

module.exports = router;
