import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../API/axios";

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: number[]) => {
      const results = await Promise.allSettled(
        ids.map((id) => api.delete(`/transactions/${id}`)),
      );

      const failed = results.filter((r) => r.status === "rejected");

      if (failed.length) {
        throw new Error(`${failed.length} deletions failed`);
      }

      return results;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },

    onError: (error) => {
      console.error("Delete transaction failed:", error);
    },
  });
};
