const {
  createProductService,
  getProductsService,
} = require("../services/product.service");

const createProduct = async (req, res, next) => {
  try {
    const product = await createProductService(req.body);
    return res.status(201).json({
      success: true,
      message: "product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const result = await getProductsService(req.query);
    return res.status(200).json({
      success: true,
      message: "products fetched successfully",
      data: result.products,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createProduct,getProducts };
