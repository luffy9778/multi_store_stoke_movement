import { publicApi } from "../api/axios";

export const loginService = async (payload) => {
  const response = await publicApi.post("/auth/login", payload, {
    withCredentials: true,
  });
  return response.data;
};
export const signUpService = async (payload) => {
  const response = await publicApi.post("/auth/signup", payload);
  return response.data;
};
