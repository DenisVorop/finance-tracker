import type { NextApiRequest } from "next/types";

import { prisma } from "common/lib/prisma";

import { BillsModel } from "./bills.model";

export class BillsService {
  static async getBills(req: NextApiRequest) {
    try {
      const user = req.__USER__;

      const bills = await prisma.bill.findMany({
        where: { userId: user.id },
      });

      return BillsModel.fromDTO({
        data: bills.map((bill) => ({ ...bill, balance: Number(bill.balance) })),
      });
    } catch {
      return BillsModel.Error({ code: 500, message: "Internal Server Error" });
    }
  }
}
