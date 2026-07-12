const mongoose = require("mongoose");
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

const transferStockService = async ({
  productId,
  sourseStoreId,
  destinationStoreId,
  quantity,
}) => {
  const session = await mongoose.startSession();
  try {
    const result = await session.withTransaction(async () => {
      const product = await Product.findById(productId).session(session);
      if (!product) {
        throw new AppError("product not found", 404);
      }
      const sourseStore = await Store.findById(sourseStoreId).session(session);
      if (!sourseStore) {
        throw new AppError("sourse store not found", 404);
      }
      const destinationStore =
        await Store.findById(destinationStoreId).session(session);
      if (!destinationStore) {
        throw new AppError("destination store not found", 404);
      }

      const sourseStock = await Stock.findOneAndUpdate(
        {
          product: productId,
          store: sourseStoreId,
          quantity: {
            $gte: quantity,
          },
        },
        {
          $inc: {
            quantity: -quantity,
          },
        },
        {
          new: true,
          session,
        },
      );
      if (!sourseStock) {
        throw new AppError("sourse strore didnt have enough stock", 400);
      }

      const destinationStoke = await Stock.findOneAndUpdate(
        {
          product: productId,
          store: destinationStoreId,
        },
        {
          $inc: { quantity },
        },
        {
          new: true,
          upsert: true,
          runValidators: true,
          session,
        },
      );
      return {
        sourseStock,
        destinationStoke,
      };
    });
    return result;
  } finally {
    await session.endSession();
  }
};

const getStocksService = async ({
  productId,
  storeId,
  lowStock,
  page = 1,
  limit = 10,
}) => {
  const filter = {};
  if (productId) {
    filter.product = productId;
  }
  if (storeId) {
    filter.store = storeId;
  }
  if (lowStock !== undefined) {
    filter.quantity = { $lte: lowStock };
  }
  console.log(lowStock)
  const skip = (page - 1) * limit;

  const [stocks, total] = await Promise.all([
    Stock.find(filter)
      .populate("product", "name sku")
      .populate("store", "name")
      .skip(skip)
      .limit(limit).lean()
      .sort({ quantity: 1 }),
    Stock.countDocuments(filter),
  ]);
  return {
    stocks,
    pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
  };
};

module.exports = {
  adjustStockService,
  transferStockService,
  getStocksService,
};
