const express = require("express");
const validate = require("../middlewares/validate.middleware");
const verifyJwt = require("../middlewares/verifyJwt");
const verifyRole = require("../middlewares/verifyRole");

const {
  createStoreSchema,
  getStoresSchema,
} = require("../validations/store.validation");
const { createStore, getStores } = require("../controllers/store.controller");
const router = express.Router();

router.use(verifyJwt);

/**
 * @swagger
 * /store:
 *   post:
 *     summary: Create a new store
 *     tags:
 *       - Stores
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
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *                 example: store1
 *               location:
 *                 type: string
 *                 example: location1
 *     responses:
 *       201:
 *         description: Store created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       409:
 *         description: Store already exists
 */
router.post("/", verifyRole("ADMIN"), validate(createStoreSchema), createStore);

/**
 * @swagger
 * /store:
 *   get:
 *     summary: Get all stores
 *     tags:
 *       - Stores
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
 *         description: Number of stores per page
 *     responses:
 *       200:
 *         description: Stores fetched successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.get("/", validate(getStoresSchema), getStores);

module.exports = router;
