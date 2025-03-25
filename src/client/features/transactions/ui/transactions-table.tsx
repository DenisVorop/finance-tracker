import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import type { Transaction } from "@/entities/transactions/types";

const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

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
              {formatDate(transaction.date)}
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