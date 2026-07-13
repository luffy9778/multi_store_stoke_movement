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

/**
 * @swagger
 * /stock/adjust:
 *   patch:
 *     summary: Adjust stock quantity
 *     tags:
 *       - Stock
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - storeId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 685a8d9e123456789abcdef0
 *               storeId:
 *                 type: string
 *                 example: 685a8d9e123456789abcdef1
 *               quantity:
 *                 type: integer
 *                 description: Positive to increase stock, negative to decrease stock.
 *                 example: 10
 *     responses:
 *       200:
 *         description: Stock adjusted successfully
 *       400:
 *         description: Validation error 
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: Product or store not found
 *       409:
 *         description: stock cnnot be negative
 */
router.patch(
  "/adjust",
  verifyRole("ADMIN"),
  validate(adjustStockSchema),
  adjustStock,
);

/**
 * @swagger
 * /stock/transfer:
 *   post:
 *     summary: Transfer stock 
 *     tags:
 *       - Stock
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - sourseStoreId
 *               - destinationStoreId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 685a8d9e123456789abcdef0
 *               sourseStoreId:
 *                 type: string
 *                 example: 685a8d9e123456789abcdef1
 *               destinationStoreId:
 *                 type: string
 *                 example: 685a8d9e123456789abcdef2
 *               quantity:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Stock transferred successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product or store not found
 */
router.post(
  "/transfer",
  verifyRole("ADMIN"),
  validate(transferStockSchema),
  transferStock,
);

/**
 * @swagger
 * /stock:
 *   get:
 *     summary: Get stock 
 *     tags:
 *       - Stock
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: productId
 *         schema:
 *           type: string
 *         description: Filter by product
 *       - in: query
 *         name: storeId
 *         schema:
 *           type: string
 *         description: Filter by store
 *       - in: query
 *         name: threshold
 *         schema:
 *           type: integer
 *         description: Return stock with quantity less than or equal to this value
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Stock fetched successfully
 *       400:
 *         description: Invalid query parameters
 *       401:
 *         description: Unauthorized
 */
router.get("/", validate(getStocksSchema), getStocks);

module.exports = router;
