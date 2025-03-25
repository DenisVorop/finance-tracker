import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { transactionsApiInstance } from "@/shared/api/transactions/api-instance";
import type { Transaction, Period } from "@/entities/transactions/types";
import { TransactionsTable } from "./transactions-table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/shared/ui/select";

const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
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

export function TransactionsFeature() {
  const [period, setPeriod] = useState<Period>("month");

  const { data: transactions = [] } = useQuery<Transaction[]>({
    queryKey: ["transactions", period],
    queryFn: async () => {
      const dateFilter = getDateFilter();
      const params = dateFilter
        ? {
            from: getStartOfDay(dateFilter).toISOString(),
            to: getEndOfDay(new Date()).toISOString()
          }
        : undefined;

      return transactionsApiInstance({
        url: "/transactions",
        method: "GET",
        params
      });
    },
  });

  function getDateFilter() {
    if (period === "all") {
      return null;
    }
    
    const now = new Date();
    let result;
    
    switch (period) {
      case "week":
        result = new Date(now);
        result.setDate(now.getDate() - 7);
        return result;
      case "month":
        result = new Date(now);
        result.setMonth(now.getMonth() - 1);
        return result;
      case "year":
        result = new Date(now);
        result.setFullYear(now.getFullYear() - 1);
        return result;
      default:
        return null;
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Операции</h1>
        <div className="flex items-center gap-4">
          <Select 
            value={period} 
            onValueChange={(value: string) => setPeriod(value as Period)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Выберите период" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">За все время</SelectItem>
              <SelectItem value="week">За неделю</SelectItem>
              <SelectItem value="month">За месяц</SelectItem>
              <SelectItem value="year">За год</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <TransactionsTable transactions={transactions} />
    </div>
  );
} 