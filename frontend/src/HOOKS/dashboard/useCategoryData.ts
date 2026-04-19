// hooks/dashboard/useCategoryData.ts
import { useQuery } from "@tanstack/react-query";
import { getCategoryData } from "../../API/dashboard.api";

export const useCategoryData = (period: string) => {
  return useQuery({
    queryKey: ["category-data", period],
    queryFn: async () => {
      const res = await getCategoryData(period);
      return res.data.data.data ?? [];
    },
  });
};
