export type PeriodType = "month" | "year" | "week";

export interface OverviewDataType {
  title: string;
  value: number | string;
  percentage: number;
}

export interface CategoryDataTypes {
  title: string;
  type: "income" | "expense";
  amount: string;
}
export interface CategoryExpenseTypes {
  title: string;
  total_expense: number;
  percentage: number;
}
export interface TransactionDetailsType {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
  type: "income" | "expense";
}

export interface BudgetDataType {
  id: number;
  category: string;
  limit: number;
  spent: number;
}
