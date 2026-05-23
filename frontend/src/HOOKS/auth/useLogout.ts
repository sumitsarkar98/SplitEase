import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { logoutUser } from "../../API/auth.api";
import { useAuth } from "../../context/AuthContext";

export const useLogout = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  return useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      // clear context
      logout();

      // success toast
      toast.success("Logout successfully");

      // redirect
      navigate("/login");
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Logout failed");
    },
  });
};
