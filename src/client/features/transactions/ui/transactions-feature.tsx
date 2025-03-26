import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format, startOfDay, endOfDay } from "date-fns";
import { ru } from "date-fns/locale";
import { transactionsApiInstance } from "@/shared/api/transactions/api-instance";
import type { Transaction, Period } from "@/entities/transactions/types";
import { TransactionsTable } from "./transactions-table";

export function TransactionsFeature() {
  const [period, setPeriod] = useState<Period>("month");

  const { data: transactions = [] } = useQuery<Transaction[]>({
    queryKey: ["transactions", period],
    queryFn: async () => {
      const dateFilter = getDateFilter();
      const params = dateFilter
        ? {
            from: startOfDay(dateFilter).toISOString(),
            to: endOfDay(new Date()).toISOString()
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
          <div className="text-sm text-gray-500">
            {period !== "all" && (
              <>
                Период: {format(getDateFilter() || new Date(), "d MMMM yyyy", { locale: ru })} - {format(new Date(), "d MMMM yyyy", { locale: ru })}
              </>
            )}
          </div>
          <select
            className="border rounded p-2"
            value={period}
            onChange={(e) => setPeriod(e.target.value as Period)}
          >
            <option value="all">За все время</option>
            <option value="week">За неделю</option>
            <option value="month">За месяц</option>
            <option value="year">За год</option>
          </select>
        </div>
      </div>

      <TransactionsTable transactions={transactions} />
    </div>
  );
} 