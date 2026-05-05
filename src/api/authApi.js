import { API } from "./axiosInstance";

export const loginUser = (credentials) => {
  API.post("/auth/login", credentials);
};
