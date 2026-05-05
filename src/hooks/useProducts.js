import { useQuery } from "@tanstack/react-query";
import {
  getAllProducts,
  getCategories,
  getProductById,
  getProductsByCategory,
} from "../api/productApi";

export const useAllProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
};
export const useProductById = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });
};

export const useAllCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

export const useProductsByCategory = (category) => {
  return useQuery({
    queryKey: ["products", category],
    queryFn: () => getProductsByCategory(category),
  });
};
