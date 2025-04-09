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

  static async CreateCategory(req: NextApiRequest, res: NextApiResponse) {
    if (!req.__USER__?.id) {
      return res.status(401).json({ error: "Неавторизован" });
    }

    const bill = await CategoriesService.createCategory(req);

    if (bill._isEmpty) {
      return res.status(404).json({ error: "Ничего не найдено" });
    }

    if (bill._isError) {
      return res
        .status(bill._meta?.code || 500)
        .json({ error: bill._meta?.message });
    }

    return res.status(200).json(bill.toDTO());
  }

  static async DeleteCategory(req: NextApiRequest, res: NextApiResponse) {
    if (!req.__USER__?.id) {
      return res.status(401).json({ error: "Неавторизован" });
    }

    const bill = await CategoriesService.deleteCategory(req);

    if (bill._isEmpty) {
      return res.status(404).json({ error: "Ничего не найдено" });
    }

    if (bill._isError) {
      return res
        .status(bill._meta?.code || 500)
        .json({ error: bill._meta?.message });
    }

    return res.status(200).json(bill.toDTO());
  }

  static async UpdateCategory(req: NextApiRequest, res: NextApiResponse) {
    if (!req.__USER__?.id) {
      return res.status(401).json({ error: "Неавторизован" });
    }

    const bill = await CategoriesService.updateCategory(req);

    if (bill._isEmpty) {
      return res.status(404).json({ error: "Ничего не найдено" });
    }

    if (bill._isError) {
      return res
        .status(bill._meta?.code || 500)
        .json({ error: bill._meta?.message });
    }

    return res.status(200).json(bill.toDTO());
  }
}
