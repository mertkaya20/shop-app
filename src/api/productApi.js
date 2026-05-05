import { API } from "./axiosInstance";

export const getAllProducts = () => API.get("/products");

export const getProductById = (id) => API.get(`/products/${id}`);

export const getCategories = () => API.get("/products/categories");

export const getProductsByCategory = (category) =>
  API.get(`/products/category/${category}`);
