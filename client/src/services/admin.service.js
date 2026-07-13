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

export const createProductService = async (payload) => {
  const response = await privateApi.post("/product",payload);
  return response.data;
};

export const createStoreService = async (payload) => {
  const response = await privateApi.post("/store",payload);
  return response.data;
};

export const transferStockService = async (payload) => {
  const response = await privateApi.post("/stock/transfer",payload);
  return response.data;
};