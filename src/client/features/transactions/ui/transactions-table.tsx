import React from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import type { Transaction } from "@/entities/transactions/types";

interface TransactionsTableProps {
  transactions: Transaction[];
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  return (
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
  );
} 