export interface CategoryDataType {
  category: string;
  amount: number;
  percentage: number;
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
