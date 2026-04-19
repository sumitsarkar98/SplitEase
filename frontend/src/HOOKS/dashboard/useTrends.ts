// hooks/dashboard/useTrends.ts
import { useQuery } from "@tanstack/react-query";
import { getTrends } from "../../API/dashboard.api";

export const useTrends = () => {
  return useQuery({
    queryKey: ["trends"],
    queryFn: async () => {
      const res = await getTrends();
      return res.data?.data?.data || [];
    },
  });
};
