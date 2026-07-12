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
router.post("/", verifyRole("ADMIN"), validate(createStoreSchema), createStore);
router.get("/", validate(getStoresSchema), getStores);

module.exports = router;
