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

const getStoresService = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const [stores, total] = await Promise.all([
    Store.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Store.countDocuments(),
  ]);
  return {
    stores,
    pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
  };
};

module.exports = { createStoreService, getStoresService };
