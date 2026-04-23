import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchGoals, addGoal } from "../../API/budget.api";

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
