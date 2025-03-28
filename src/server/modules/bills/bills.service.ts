import type { NextApiRequest } from "next/types";

import { prisma } from "common/lib/prisma";
import type { Bill, DataBaseBill } from "common/types/bill.types";
import { billSchema } from "common/schemas/bill.schema";

import { BillsModel } from "./bills.model";

export class BillsService {
  static async getBills(req: NextApiRequest) {
    try {
      const user = req.__USER__;

      const bills = await prisma.bill.findMany({
        where: { userId: user.id },
      });

      return BillsModel.fromDTO({
        data: bills.map(this._prepareBalance),
      });
    } catch {
      return BillsModel.Error({ code: 500, message: "Internal Server Error" });
    }
  }

  /** Возвращает модель, в которой data - массив, состоящий из 1 элемента - созданного счёта */
  static async createBill(req: NextApiRequest) {
    try {
      const user = req.__USER__;

      const data = await billSchema.validate(req.body);

      const bill = await prisma.bill.create({
        data: {
          userId: user.id,
          ...data,
        },
      });

      return BillsModel.fromDTO({
        data: [this._prepareBalance(bill)],
      });
    } catch {
      return BillsModel.Error({ code: 500, message: "Internal Server Error" });
    }
  }

  static async getBill(req: NextApiRequest) {
    try {
      const user = req.__USER__;
      const id = Number(req.query.id);

      const bill = await prisma.bill.findUnique({
        where: { id, userId: user.id },
      });

      if (!bill) {
        return BillsModel.Empty();
      }

      return BillsModel.fromDTO({
        data: [this._prepareBalance(bill)],
      });
    } catch {
      return BillsModel.Error({ code: 500, message: "Internal Server Error" });
    }
  }

  static async deleteBill(req: NextApiRequest) {
    try {
      const user = req.__USER__;
      const id = Number(req.query.id);

      const bill = await prisma.bill.findUnique({
        where: { id, userId: user.id },
      });

      if (!bill) {
        return BillsModel.Empty();
      }

      await prisma.bill.delete({ where: { id: bill.id } });

      return BillsModel.fromDTO({
        data: [this._prepareBalance(bill)],
      });
    } catch {
      return BillsModel.Error({ code: 500, message: "Internal Server Error" });
    }
  }

  static async updateBill(req: NextApiRequest) {
    try {
      const user = req.__USER__;
      const id = Number(req.query.id);

      const bill = await prisma.bill.findUnique({
        where: { id, userId: user.id },
      });

      if (!bill) {
        return BillsModel.Empty();
      }

      const data = await billSchema.validate(req.body);

      const updatedBill = await prisma.bill.update({
        where: { id: bill.id },
        data,
      });

      return BillsModel.fromDTO({
        data: [this._prepareBalance(updatedBill)],
      });
    } catch {
      return BillsModel.Error({ code: 500, message: "Internal Server Error" });
    }
  }

  private static _prepareBalance(bill: DataBaseBill): Bill {
    return {
      ...bill,
      balance: Number(bill.balance),
    };
  }
}
