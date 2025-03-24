import type { NextApiRequest } from "next/types";
import { prisma } from "common/lib/prisma";
import { TransactionsModel } from "./transactions.model";
import type { Transaction, Bill } from "@prisma/client";

type TransactionWithBill = Transaction & {
  bill: Pick<Bill, "name">;
};

export class TransactionsService {
  static async getTransactions(req: NextApiRequest) {
    try {
      const user = req.__USER__;
      const { from, to } = req.query;

      console.log('Filter from date:', from);
      console.log('Filter to date:', to);

      const whereCondition: any = {
        bill: {
          userId: user.id
        }
      };

      if (from) {
        const fromDate = new Date(from as string);
        console.log('Parsed from date:', fromDate);
        whereCondition.date = {
          gte: fromDate
        };
      }

      if (to) {
        const toDate = new Date(to as string);
        console.log('Parsed to date:', toDate);
        whereCondition.date = {
          ...whereCondition.date,
          lte: toDate
        };
      }

      console.log('Where condition:', JSON.stringify(whereCondition, null, 2));

      const transactions = await prisma.transaction.findMany({
        where: whereCondition,
        include: {
          bill: {
            select: {
              name: true
            }
          }
        },
        orderBy: {
          date: 'desc'
        }
      }) as TransactionWithBill[];

      console.log('Found transactions:', transactions.length);

      return TransactionsModel.fromDTO({
        data: transactions.map((transaction) => ({
          id: transaction.id,
          date: transaction.date,
          amount: Number(transaction.amount),
          description: transaction.description || "",
          category: transaction.category,
          billName: transaction.bill.name
        })),
      });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return TransactionsModel.Error({ code: 500, message: "Internal Server Error" });
    }
  }
} 