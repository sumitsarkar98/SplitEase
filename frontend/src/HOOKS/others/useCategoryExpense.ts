// API --> "http://localhost:3000/api/v1"
import { useQuery } from "@tanstack/react-query";
import { getCategoryExpenses } from "../../API/others";

export const useCategoryExpense = () => {
  return useQuery({
    queryKey: ["category-expenses"],
    queryFn: async () => {
      const res = await getCategoryExpenses();
      return res.data.data ?? [];
    },
  });
};
