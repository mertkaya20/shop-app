import { API } from "./axiosInstance";

export const getUserCart = async (userId) => {
  const response = await API.get(`/carts/user/${userId}`);
  return response.data;
};

export const addToCart = async (cartData) => {
  const response = await API.post("/carts", cartData);
  return response.data;
};

export const updateCart = async (id, cartData) => {
  const response = await API.put(`/carts/${id}`, cartData);
  return response.data;
};

export const deleteCart = async (id) => {
  const response = await API.delete(`/carts/${id}`);
  return response.data;
};
