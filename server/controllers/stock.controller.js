const {
  adjustStockService,
  transferStockService,
} = require("../services/stock.service");

const adjustStock = async (req, res, next) => {
  try {
    const stock = await adjustStockService(req.body);

    return res.status(200).json({
      success: true,
      message: "stock adjusted successfully",
      data: stock,
    });
  } catch (error) {
    next(error);
  }
};

const transferStock = async (req, res, next) => {
  try {
    const stock = await transferStockService(req.body);
    
    return res.status(200).json({
      success: true,
      message: "stock transfered successfully",
      data: stock,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  adjustStock,
  transferStock,
};
