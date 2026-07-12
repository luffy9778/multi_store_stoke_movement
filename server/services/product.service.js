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

const getProductsService = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const [products, total] = await Promise.all([
    Product.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Product.countDocuments(),
  ]);
  return {
    products,
    pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
  };
};
module.exports = { createProductService, getProductsService };
