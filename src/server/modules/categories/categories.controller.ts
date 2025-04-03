import type { NextApiRequest, NextApiResponse } from "next/types";

import { CategoriesService } from "./categories.service";

export class CategoriesController {
  static async GetCategories(req: NextApiRequest, res: NextApiResponse) {
    if (!req.__USER__?.id) {
      return res.status(401).json({ error: "Неавторизован" });
    }

    const bills = await CategoriesService.getCategories(req);

    return res.status(200).json(bills.toDTO());
  }
}
