const Product = require("../models/Product");
const Stock = require("../models/Stock");
const Store = require("../models/Store");
const AppError = require("../utils/AppError");

const adjustStockService = async ({ productId, storeId, quantity }) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError("product not found", 404);
  }
  const store = await Store.findById(storeId);
  if (!store) {
    throw new AppError("store not found", 404);
  }
  const stock = await Stock.findOne({ product: product._id, store: store._id });
  if (!stock) {
    if (quantity < 0) {
      throw new AppError("cannot crete stock with a negative quntity ", 400);
    }
    try {
      const newStock = await Stock.create({
        product: product._id,
        store: store._id,
        quantity,
      });
      return newStock;
    } catch (error) {
      if (error.code === 11000) {
        throw new AppError("stock alredy exist in this store", 409);
      }
      throw error;
    }
  }
  const query = { _id: stock._id };

  if (quantity < 0) {
    query.quantity = {
      $gte: Math.abs(quantity),
    };
  }
  const updateStock = await Stock.findOneAndUpdate(
    query,
    {
      $inc: { quantity },
    },
    {
      new: true,
      runValidators: true,
    },
  );
  if (!updateStock) {
    throw new AppError("stock cnnot be negative", 409);
  }
  return updateStock;
};

module.exports = {
  adjustStockService,
};
