import { privateApi } from "../api/axios";

export const getProductsService = async () => {
  const response = await privateApi.get("/product?page=1&limit=100");
  return response.data;
};

export const getStoreService = async () => {
  const response = await privateApi.get("/store?page=1&limit=100");
  return response.data;
};

export const getStockService = async (params) => {
  const response = await privateApi.get("/stock",{params});
  return response.data;
};

export const adjustStockService = async (payload) => {
  const response = await privateApi.patch("/stock/adjust",payload);
  return response.data;
};
