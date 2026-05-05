import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/authApi";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout as logoutAction } from "../store/slices/authSlice";

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data, variables) => {
      dispatch(
        login({
          token: data.token,
          user: { username: variables.username },
        }),
      );
      navigate("/");
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutAction());
    navigate("/login");
  };

  return { logout };
};
