import type { Transaction, Bill } from "@prisma/client";

type TransactionWithBill = Transaction & {
  bill: Pick<Bill, "name">;
};

interface TransactionDTO {
  data: TransactionWithBill[];
}

interface ErrorDTO {
  code: number;
  message: string;
}

export class TransactionsModel {
  static fromDTO(dto: TransactionDTO) {
    return {
      success: true,
      data: dto.data.map(transaction => ({
        id: transaction.id,
        date: transaction.date,
        amount: Number(transaction.amount),
        description: transaction.description || "",
        category: transaction.category,
        billName: transaction.bill.name
      })),
    };
  }

  static Error(dto: ErrorDTO) {
    return {
      success: false,
      error: {
        code: dto.code,
        message: dto.message,
      },
    };
  }
} 