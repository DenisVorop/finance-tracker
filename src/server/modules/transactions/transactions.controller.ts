import type { NextApiRequest, NextApiResponse } from "next";

import { TransactionsService } from "./transactions.service";

export class TransactionsController {
  static async GetTransactions(req: NextApiRequest, res: NextApiResponse) {
    const result = await TransactionsService.getTransactions(req);
    
    if (!result.success) {
      return res.status(result.error.code).json(result.error);
    }

    return res.status(200).json(result.data);
  }
} 