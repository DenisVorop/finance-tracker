import { startOfDay, endOfDay } from "date-fns";
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

export class TransactionsModel {
  static async getTransactions(period: Period) {
    const dateFilter = this.getDateFilter(period);
    const params = dateFilter 
      ? { 
          from: startOfDay(dateFilter).toISOString(),
          to: endOfDay(new Date()).toISOString()
        }
      : undefined;
    
    const response = await transactionsApiInstance<TransactionDto[]>({ 
      url: "/transactions", 
      method: "GET",
      params
    });

    return this.mapFromDto(response);
  }

  private static mapFromDto(dto: TransactionDto[]): Transaction[] {
    return dto.map((transaction) => ({
      id: transaction.id,
      date: transaction.date,
      amount: Number(transaction.amount),
      description: transaction.description || "",
      category: transaction.category,
      billName: transaction.bill.name
    }));
  }

  private static getDateFilter(period: Period) {
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
  }
} 