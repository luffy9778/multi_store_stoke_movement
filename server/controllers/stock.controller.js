const { adjustStockService } = require("../services/stock.service");

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

module.exports = {
  adjustStock,
};
