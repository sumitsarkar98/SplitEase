import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../API/axios";

export const useAddTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/transactions", data);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },

    onError: (error) => {
      console.error("Add transaction failed:", error);
    },
  });
};
