// API --> "http://localhost:3000/api/v1"
import { useQuery } from "@tanstack/react-query";
import { getInsights } from "../../API/insights";

export const useGetInsights = () => {
  return useQuery({
    queryKey: ["insights"],
    queryFn: async () => {
      const res = await getInsights();
      return res.data.data ?? [];
    },
  });
};
