import type { NextApiRequest, NextApiResponse } from "next";

import { authMiddleware } from "$/middlewares/auth.middleware";
import { ReportsController } from "$/modules/reports";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return ReportsController.GetCategoriesSummary(req, res);
    default:
      return res.status(405).json({ error: "Метод не разрешён" });
  }
}

export default authMiddleware(handler);
