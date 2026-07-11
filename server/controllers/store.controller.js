const { createStoreService } = require("../services/store.service");

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

module.exports = { createStore };
