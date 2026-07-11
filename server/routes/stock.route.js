const express = require("express");
const validate = require("../middlewares/validate.middleware");
const verifyJwt = require("../middlewares/verifyJwt");
const verifyRole = require("../middlewares/verifyRole");
const {
  adjustStockSchema,
  transferStockSchema,
} = require("../validations/stock.validation");
const {
  adjustStock,
  transferStock,
} = require("../controllers/stock.controller");

const router = express.Router();

router.use(verifyJwt);
router.patch(
  "/adjust",
  verifyRole("ADMIN"),
  validate(adjustStockSchema),
  adjustStock,
);
router.post(
  "/transfer",
  verifyRole("ADMIN"),
  validate(transferStockSchema),
  transferStock,
);

module.exports = router;
