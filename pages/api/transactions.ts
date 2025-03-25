import type { NextApiRequest, NextApiResponse } from "next";
import { TransactionsController } from "$/modules/transactions/transactions.controller";
import { authMiddleware } from "$/middlewares/auth.middleware";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return TransactionsController.GetTransactions(req, res);
    default:
      return res.status(405).json({ error: "Метод не разрешён" });
  }
}

export default authMiddleware(handler); 