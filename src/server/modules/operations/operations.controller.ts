import type { NextApiRequest, NextApiResponse } from "next/types";

import { OperationsService } from "./operations.service";

export class OperationsController {
  static async GetOperations(req: NextApiRequest, res: NextApiResponse) {
    if (!req.__USER__?.id) {
      return res.status(401).json({ error: "Неавторизован" });
    }

    const bills = await OperationsService.getOperations(req);

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

  static async CreateOperation(req: NextApiRequest, res: NextApiResponse) {
    if (!req.__USER__?.id) {
      return res.status(401).json({ error: "Неавторизован" });
    }

    const bill = await OperationsService.createOperation(req);

    if (bill._isEmpty) {
      return res.status(404).json({ error: "Ничего не найдено" });
    }

    if (bill._isError) {
      return res
        .status(bill._meta?.code || 500)
        .json({ error: bill._meta?.message });
    }

    const [dto] = bill.toDTO().data;

    return res.status(200).json(dto);
  }
}
