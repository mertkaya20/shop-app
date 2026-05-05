import axios from "axios";

export const API = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});
