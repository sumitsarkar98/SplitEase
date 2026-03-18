export interface CategoryDataTypes {
  title: string;
  total_expense: string;
}

export interface TransactionDataType {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
  type: "income" | "expense";
}

export interface BarchartDataType {
  month: string;
  income: number;
  expense: number;
}

export interface DetailsTransactionType {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
  type: "income" | "expense";
}

export interface BudgetDataType {
  name: string;
  spent: number;
  target: number;
}

export interface OverviewDataType {
  title: string;
  value: string | number;
  percentage: number;
}

export type PeriodType = "month" | "year" | "week";
