// Base_API => "http://localhost:3000/api/v1"
import api from "./axios";

// ===== API CALLS =====
export const getTransactions = (period: string, type: string) =>
  api.get(`/transactions?period=${period}&type=${type}`);


