import type { NextApiRequest, NextApiResponse } from "next";

import { BillsController } from "$/modules/bills";
import { authMiddleware } from "$/middlewares/auth.middleware";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return BillsController.GetBill(req, res);
    case "DELETE":
      return BillsController.DeleteBill(req, res);
    case "PUT":
      return BillsController.UpdateBill(req, res);
    default:
      return res.status(405).json({ error: "Метод не разрешён" });
  }
}

export default authMiddleware(handler);
