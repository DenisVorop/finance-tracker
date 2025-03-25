import { useQuery } from "@tanstack/react-query";
import { transactionsApiInstance } from "@/shared/api/transactions/api-instance";
import type { Transaction, Period } from "./types";

interface TransactionDto {
  id: number;
  date: string;
  amount: string;
  description: string | null;
  category: string;
  bill: {
    name: string;
  };
}

const baseKey = "transactions";

const mapFromDto = (dto: TransactionDto[]): Transaction[] => {
  return dto.map((transaction) => ({
    id: transaction.id,
    date: transaction.date,
    amount: Number(transaction.amount),
    description: transaction.description || "",
    category: transaction.category,
    billName: transaction.bill.name
  }));
};

const getDateFilter = (period: Period) => {
  const now = new Date();
  switch (period) {
    case "week":
      return new Date(now.setDate(now.getDate() - 7));
    case "month":
      return new Date(now.setMonth(now.getMonth() - 1));
    case "year":
      return new Date(now.setFullYear(now.getFullYear() - 1));
    default:
      return null;
  }
};

const getStartOfDay = (date: Date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const getEndOfDay = (date: Date) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

export const setTransactionsFromCtx = (ctx: App.PageContext) => {
  return [[baseKey], ctx.req.__TRANSACTIONS__] as const;
};

export const getTransactions = async (period: Period) => {
  const dateFilter = getDateFilter(period);
  const params = dateFilter 
    ? { 
        from: getStartOfDay(dateFilter).toISOString(),
        to: getEndOfDay(new Date()).toISOString()
      }
    : undefined;
  
  const response = await transactionsApiInstance<TransactionDto[]>({ 
    url: "/transactions", 
    method: "GET",
    params
  });

  return mapFromDto(response);
};

export function useTransactions(period: Period) {
  return useQuery<Transaction[]>({
    queryKey: [baseKey, period],
    queryFn: () => getTransactions(period),
  });
} 