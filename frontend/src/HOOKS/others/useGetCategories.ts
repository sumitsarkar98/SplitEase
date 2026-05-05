// API --> "http://localhost:3000/api/v1"
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../API/others";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await getCategories();
      return res.data.data ?? [];
    },
  });
};
