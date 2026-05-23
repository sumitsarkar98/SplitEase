// useLogin.ts

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { loginUser } from "../../API/auth.api";
import { useAuth } from "../../context/AuthContext";

import type { User } from "../../types/ApiDataTypes";

export const useLogin = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (response) => {
      const user: User = response.data.data.user;
      console.log("user is :", user);

      // set context user
      login(user);

      // success toast
      toast.success("Login successful");

      // redirect
      navigate("/home/dashboard");
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Login failed");
    },
  });
};
