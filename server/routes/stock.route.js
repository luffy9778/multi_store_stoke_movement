const express = require("express");
const validate = require("../middlewares/validate.middleware");
const verifyJwt = require("../middlewares/verifyJwt");
const verifyRole = require("../middlewares/verifyRole");
const { adjustStockSchema } = require("../validations/stock.validation");
const { adjustStock } = require("../controllers/stock.controller");

const router = express.Router();

router.use(verifyJwt);
router.patch(
  "/adjust",
  verifyRole("ADMIN"),
  validate(adjustStockSchema),
  adjustStock,
);

module.exports = router;
