import type { NextApiRequest, NextApiResponse } from "next";

import { BillsController } from "$/modules/bills";
import { authMiddleware } from "$/middlewares/auth.middleware";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return BillsController.GetBills(req, res);
    case "POST":
      return BillsController.CreateBill(req, res);
    default:
      return res.status(405).json({ error: "Метод не разрешён" });
  }
}

export default authMiddleware(handler);
