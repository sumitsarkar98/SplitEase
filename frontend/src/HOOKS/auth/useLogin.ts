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

    onSuccess: async (response) => {
      const user: User = response.data.data.user;

      console.log("Logged in user:", user);

      // update auth context
      login(user);

      toast.success("Login successful");

      // small delay ensures context updates first
      setTimeout(() => {
        navigate("/home/dashboard", { replace: true });
      }, 0);
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Login failed");
    },
  });
};
