const Product = require("../models/Product");
const AppError = require("../utils/AppError");

const createProductService = async ({ name, sku }) => {
  try {
    const product = await Product.create({
      name,
      sku,
    });

    return product;
  } catch (error) {
    if (error.code === 11000) {
      throw new AppError("product already exist", 409);
    }
    throw error;
  }
};

module.exports = { createProductService };
