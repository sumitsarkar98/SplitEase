import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchGoals,
  addGoal,
  deleteGoal,
  updateGoal,
} from "../../API/budget.api";

// GET goals
export const useGoals = () => {
  return useQuery({
    queryKey: ["goals"],
    queryFn: async () => {
      const res = await fetchGoals();
      return res?.data?.data?.goals ?? [];
    },
  });
};
// CREATE goal
export const useCreateGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (goalData: {
      title: string;
      target_amount: number;
      target_date?: string | null;
    }) => {
      const res = await addGoal(goalData);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
};

// DELETE goal
export const useDeleteGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await deleteGoal(id);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },

    onError: (error) => {
      console.error("Delete goal failed:", error);
    },
  });
};

// UPDATE goal
export const useUpdateGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: {
        target_amount?: number;
        saved_amount?: number;
        target_date?: string | null;
      };
    }) => {
      const res = await updateGoal(id, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });
};
