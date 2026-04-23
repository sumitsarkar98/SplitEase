// API --> "http://localhost:3000/api/v1"
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../API/transaction.api";

export const useTransactions = (period: string, type: string) => {
  return useQuery({
    queryKey: ["transactions", period, type],
    queryFn: async () => {
      const res = await getTransactions(period, type);
      return res.data.data.transaction_details ?? [];
    },
  });
};
