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

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: signup user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: user1
 *               email:
 *                 type: string
 *                 example: admin@test.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       201:
 *         description: user registerd successfully
 *       400:
 *          description: Validation Error
 *       409:
 *          description: email alredy exist
 */
router.post("/signup", validate(signUpSchema), signUp);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@test.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid email or password
 *       400:
 *          description: Validation Error
 */
router.post("/login", validate(loginSchema), login);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: get new accesstoken
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: successful
 *       401:
 *         description: unauthorized
 *       404:
 *          description: User not found
 */
router.post("/refresh", refresh);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Logged out
 */
router.post("/logout", logOut);

module.exports = router;
