const express = require("express");
const validate = require("../middlewares/validate.middleware");
const verifyJwt = require("../middlewares/verifyJwt");
const verifyRole = require("../middlewares/verifyRole");

const { createStoreSchema } = require("../validations/store.validation");
const { createStore } = require("../controllers/store.controller");
const router = express.Router();

router.use(verifyJwt);
router.post("/", verifyRole("ADMIN"), validate(createStoreSchema), createStore);

module.exports = router;
