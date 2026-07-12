const express = require("express");
const validate = require("../middlewares/validate.middleware");
const verifyJwt = require("../middlewares/verifyJwt");
const verifyRole = require("../middlewares/verifyRole");
const {
  adjustStockSchema,
  transferStockSchema,
  getStocksSchema,
} = require("../validations/stock.validation");
const {
  adjustStock,
  transferStock,
  getStocks,
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
router.get("/", validate(getStocksSchema), getStocks);

module.exports = router;
