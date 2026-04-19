// api/dashboard.api.ts
import api from "./axios";

// map frontend → backend
const periodMap: Record<string, string> = {
  week: "weekly",
  month: "monthly",
  year: "yearly",
};

const mapPeriod = (period: string) => {
  return periodMap[period] || "monthly";
};

// ===== API CALLS + Period Mapping =====
export const getCardData = (period: string) =>
  api.get(`/dashboard/card?period=${mapPeriod(period)}`);

export const getCategoryData = (period: string) =>
  api.get(`/dashboard/category?period=${mapPeriod(period)}`);

// ===== API CALLS without Period =====
export const getTrends = () => api.get(`/dashboard/trends`);

export const getRecentIncome = () => api.get(`/dashboard/recent-income`);
