import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchBudgets, addBudget, deleteBudget } from "../../API/budget.api";

// GET budgets
export const useBudgets = (month?: number, viewAll?: boolean) => {
  return useQuery({
    queryKey: ["budgets", month, viewAll],
    queryFn: async () => {
      const res = await fetchBudgets(month, viewAll);
      return res.data.data.budgets ?? [];
    },
  });
};

// CREATE budget
export const useCreateBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (budgetData: {
      category_id: number;
      budget_limit: number;
      month: number;
    }) => {
      const res = await addBudget(budgetData);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
};

// DELETE budget
export const useDeleteBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await deleteBudget(id);
    },

    onSuccess: () => {
      // refresh budgets
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },

    onError: (error) => {
      console.error("Delete budget failed:", error);
    },
  });
};
