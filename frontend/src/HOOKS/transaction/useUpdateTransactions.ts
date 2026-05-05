import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../API/axios";

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await api.patch(`/transactions/${id}`, data);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },

    onError: (error) => {
      console.error("Update transaction failed:", error);
    },
  });
};
