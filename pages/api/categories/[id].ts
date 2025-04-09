import type { NextApiRequest, NextApiResponse } from "next";

import { authMiddleware } from "$/middlewares/auth.middleware";
import { CategoriesController } from "$/modules/categories";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "DELETE":
      return CategoriesController.DeleteCategory(req, res);
    case "PUT":
      return CategoriesController.UpdateCategory(req, res);
    default:
      return res.status(405).json({ error: "Метод не разрешён" });
  }
}

export default authMiddleware(handler);
