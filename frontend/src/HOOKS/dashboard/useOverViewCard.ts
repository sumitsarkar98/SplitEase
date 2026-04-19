// hooks/dashboard/useCardData.ts
import { useQuery } from "@tanstack/react-query";
import { getCardData } from "../../API/dashboard.api.ts";

export const useCardData = (period: string) => {
  return useQuery({
    queryKey: ["card-data", period],
    queryFn: async () => {
      const res = await getCardData(period);
      return res.data.data.overview;
    },
  });
};
