// hooks/dashboard/useRecentIncome.ts
import { useQuery } from "@tanstack/react-query";
import { getRecentIncome } from "../../API/dashboard.api";
import type { RecentIncomeType } from "../../types/ApiDataTypes.ts";

export const useRecentIncome = () => {
  return useQuery<RecentIncomeType[]>({
    queryKey: ["recent-income"],
    queryFn: async () => {
      const res = await getRecentIncome();
      return res.data?.data?.data || [];
    },
  });
};
