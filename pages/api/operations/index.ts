import type { NextApiRequest, NextApiResponse } from "next";

import { OperationsController } from "$/modules/operations";
import { authMiddleware } from "$/middlewares/auth.middleware";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return OperationsController.GetOperations(req, res);
    case "POST":
      return OperationsController.CreateOperation(req, res);
    default:
      return res.status(405).json({ error: "Метод не разрешён" });
  }
}

export default authMiddleware(handler);
