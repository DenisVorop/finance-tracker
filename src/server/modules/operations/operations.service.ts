import type { NextApiRequest } from "next/types";

import { prisma } from "common/lib/prisma";
import {
  OperationType,
  type DataBaseOperation,
  type Operation,
} from "common/types/operations.types";
import { sleep } from "@/shared/lib/sleep";
import {
  getOperationsQuerySchema,
  operationSchema,
} from "common/schemas/operation.schema";

import { OperationsModel } from "./models/operations.model";
import { OperationModel } from "./models/operation.model";

export class OperationsService {
  static async getOperations(req: NextApiRequest) {
    try {
      const user = req.__USER__;
      const { page, pageSize, billId } =
        await getOperationsQuerySchema.validate(req.query);

      // TODO: Имитация задержки
      await sleep(800);

      const [total, operations] = await prisma.$transaction([
        prisma.operation.count({
          where: { userId: user.id, billId },
        }),
        prisma.operation.findMany({
          where: { userId: user.id, billId },
          include: { bill: true },
          orderBy: { date: "desc" },
          take: pageSize,
          skip: (page - 1) * pageSize,
        }),
      ]);

      return OperationsModel.fromDTO({
        data: operations.map(this._prepareAmount),
        total,
        totalPages: Math.ceil(total / pageSize),
        params: {
          page,
          pageSize,
        },
      });
    } catch {
      return OperationsModel.Error({
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async createOperation(req: NextApiRequest) {
    try {
      const user = req.__USER__;

      const data = await operationSchema.validate(req.body);

      if (user.id !== data.userId) {
        return OperationModel.Error({
          code: 400,
          message: "Bad Request",
        });
      }

      const operation = await prisma.$transaction(async (tx) => {
        const newOperation = await tx.operation.create({
          data,
        });

        const updatedBill = await tx.bill.update({
          where: { id: data.billId },
          data: {
            balance: {
              ...(data.type === OperationType.DEPOSIT
                ? { increment: data.amount }
                : {}),
              ...(data.type === OperationType.WITHDRAWAL
                ? { decrement: data.amount }
                : {}),
            },
          },
        });

        return { ...newOperation, bill: updatedBill };
      });

      return OperationModel.fromDTO(this._prepareAmount(operation));
    } catch {
      return OperationModel.Error({
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  private static _prepareAmount(operation: DataBaseOperation): Operation {
    return {
      ...operation,
      amount: Number(operation.amount),
      bill: {
        ...operation.bill,
        balance: Number(operation.bill.balance),
      },
    };
  }
}
