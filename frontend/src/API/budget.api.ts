import api from "./axios";

/* ================= BUDGETS ================= */

// GET budgets 
export const fetchBudgets = (month?: number, viewAll?: boolean) => {
  return api.get("/budgets", {
    params: {
      ...(month && !viewAll && { month }),
      ...(viewAll && { viewAll: true }),
    },
  });
};

// CREATE budget
export const addBudget = (data: {
  category_id: number;
  budget_limit: number;
  month: number;
}) => {
  return api.post("/budgets", data);
};

// UPDATE budget
export const updateBudget = (
  budgetId: number,
  data: {
    budget_limit?: number;
    month?: number;
  },
) => {
  return api.put(`/budgets/${budgetId}`, data);
};

// DELETE budget
export const deleteBudget = (budgetId: number) => {
  return api.delete(`/budgets/${budgetId}`);
};

/* ================= GOALS ================= */

// GET goals
export const fetchGoals = () => api.get("/goals");

// CREATE goal
export const addGoal = (data: {
  title: string;
  target_amount: number;
  target_date?: string | null;
}) => {
  return api.post("/goals", data);
};

// UPDATE goal
export const updateGoal = (
  goalId: number,
  data: {
    title?: string;
    target_amount?: number;
    saved_amount?: number;
    target_date?: string | null;
  },
) => {
  return api.put(`/goals/${goalId}`, data);
};

// DELETE goal
export const deleteGoal = (goalId: number) => {
  return api.delete(`/goals/${goalId}`);
};
