const {
  createStoreService,
  getStoresService,
} = require("../services/store.service");

const createStore = async (req, res, next) => {
  try {
    const store = await createStoreService(req.body);
    return res.status(201).json({
      success: true,
      message: "store created successfully",
      data: store,
    });
  } catch (error) {
    next(error);
  }
};

const getStores = async (req, res, next) => {
  try {
    const result = await getStoresService(req.query);
    return res.status(200).json({
      success: true,
      message: "stores fetched successfully",
      data: result.stores,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createStore, getStores };
