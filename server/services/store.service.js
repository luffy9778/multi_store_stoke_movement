const Store = require("../models/Store");
const AppError = require("../utils/AppError");

const createStoreService = async ({ name, location }) => {
  try {
    const store = await Store.create({
      name,
      location,
    });

    return store;
  } catch (error) {
    if (error.code === 11000) {
      throw new AppError("store already exist", 409);
    }
    throw error;
  }
};

module.exports = { createStoreService };
