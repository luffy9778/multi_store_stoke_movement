import { privateApi } from "../api/axios";

export const getProductsService = async (params) => {
  const response = await privateApi.get("/product", { params });
  return response.data;
};

export const getStockService = async (params) => {
  const response = await privateApi.get("/stock", { params });
  return response.data;
};
