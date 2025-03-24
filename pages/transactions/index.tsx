import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../src/client/shared/ui/table";
import { format, subDays, subMonths, subYears, startOfDay, endOfDay } from "date-fns";
import { ru } from "date-fns/locale";
import { transactionsApiInstance } from "../../src/client/shared/api/transactions/api-instance";
import { DefaultLayout } from "@/app/layouts";
import { injectLayout } from "@/shared/lib/next";
import { protectedRoute } from "common/lib/protected-route";
import { StateBuilder } from "@/app/lib/state-builder";
import { useState } from "react";

interface Transaction {
  id: number;
  date: string;
  amount: number;
  description: string;
  category: string;
  billName: string;
}

type Period = "all" | "week" | "month" | "year";

function TransactionsPage() {
  const [period, setPeriod] = useState<Period>("month");

  const getDateFilter = () => {
    const now = new Date();
    switch (period) {
      case "week":
        return subDays(now, 7);
      case "month":
        return subMonths(now, 1);
      case "year":
        return subYears(now, 1);
      default:
        return null;
    }
  };

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
      
      console.log('Request params:', params);
      
      return transactionsApiInstance({ 
        url: "/transactions", 
        method: "GET",
        params
      });
    },
  });

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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Дата</TableHead>
            <TableHead>Счёт</TableHead>
            <TableHead>Категория</TableHead>
            <TableHead>Комментарий</TableHead>
            <TableHead className="text-right">Сумма</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                {format(new Date(transaction.date), "d MMMM yyyy", { locale: ru })}
              </TableCell>
              <TableCell>{transaction.billName}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell className={`text-right ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                {transaction.amount > 0 ? "+" : "−"} {Math.abs(transaction.amount)} ₽
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

injectLayout(TransactionsPage, DefaultLayout);

export default TransactionsPage;

export const getServerSideProps = protectedRoute(async (ctx) => {
  const initialState = StateBuilder.Init(ctx)
    .setBaseData()
    .build();

  return {
    props: {
      initialState,
    },
  };
}); 