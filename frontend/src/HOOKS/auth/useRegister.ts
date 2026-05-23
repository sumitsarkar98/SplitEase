// useRegister.ts

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { registerUser } from "../../API/auth.api";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,

    onSuccess: () => {
      // success toast
      toast.success("Account created successfully");

      // redirect
      navigate("/login");
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Registration failed");
    },
  });
};
