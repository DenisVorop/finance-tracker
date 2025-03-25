import type { NextApiRequest } from "next/types";
import { prisma } from "common/lib/prisma";
import { TransactionsModel } from "./transactions.model";
import type { Transaction, Bill, Prisma } from "@prisma/client";

type TransactionWithBill = Transaction & {
  bill: Pick<Bill, "name">;
};

export class TransactionsService {
  static async getTransactions(req: NextApiRequest) {
    try {
      const user = req.__USER__;
      const { from, to } = req.query;

      const whereCondition: Prisma.TransactionWhereInput = {
        bill: {
          userId: user.id
        },
        date: {}
      };

      if (from) {
        const fromDate = new Date(from as string);
        whereCondition.date = {
          gte: fromDate
        };
      }

      if (to) {
        const toDate = new Date(to as string);
        whereCondition.date = {
          ...(from ? { gte: new Date(from as string) } : {}),
          lte: toDate
        };
      }

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
          date: "desc"
        }
      }) as TransactionWithBill[];

      return TransactionsModel.fromDTO({
        data: transactions
      });
    } catch (error) {
      return TransactionsModel.Error({ code: 500, message: "Internal Server Error" });
    }
  }
} 