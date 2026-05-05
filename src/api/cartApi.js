import { API } from "./axiosInstance";

export const getUserCart = (userId) => API.get(`/carts/user/${userId}`);

export const addToCart = (cartData) => {
  API.post("/carts", cartData);
};

export const updateCart = (id, cartData) => API.put(`/carts/${id}`, cartData);

export const deleteCart = (id) => API.delete(`/carts/${id}`);
