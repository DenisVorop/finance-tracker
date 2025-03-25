export interface Transaction {
  id: number;
  date: string;
  amount: number;
  description: string | null;
  category: string;
  billName: string;
}

export type Period = "all" | "week" | "month" | "year"; 