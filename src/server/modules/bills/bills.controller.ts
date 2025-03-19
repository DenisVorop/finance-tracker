import type { NextApiRequest, NextApiResponse } from "next/types";

import { BillsService } from "./bills.service";

export class BillsController {
  static async GetBills(req: NextApiRequest, res: NextApiResponse) {
    if (!req.__USER__?.id) {
      return res.status(401).json({ error: "Неавторизован" });
    }

    const bills = await BillsService.getBills(req);

    if (bills._isEmpty) {
      return res.status(404).json({ error: "Ничего не найдено" });
    }

    if (bills._isError) {
      return res
        .status(bills._meta?.code || 500)
        .json({ error: bills._meta?.message });
    }

    return res.status(200).json(bills.toDTO());
  }
}
