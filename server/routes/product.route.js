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

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - sku
 *             properties:
 *               name:
 *                 type: string
 *                 example: product1
 *               sku:
 *                 type: string
 *                 example: ABCD13
 *     responses:
 *       201:
 *         description: product created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       409:
 *         description: product already exist
 */
router.post(
  "/",
  verifyRole("ADMIN"),
  validate(createProductSchema),
  createProduct,
);

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of products per page
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.get("/", validate(getProductsSchema), getProducts);

module.exports = router;
