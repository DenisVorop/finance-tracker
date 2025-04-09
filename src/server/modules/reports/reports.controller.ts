import type { NextApiRequest, NextApiResponse } from "next/types";

import { ReportsService } from "./reports.service";

export class ReportsController {
  static async GetChartOperations(req: NextApiRequest, res: NextApiResponse) {
    if (!req.__USER__?.id) {
      return res.status(401).json({ error: "Неавторизован" });
    }

    const chart = await ReportsService.getReports(req);

    return res.status(200).json(chart);
  }

  static async GetStatistics(req: NextApiRequest, res: NextApiResponse) {
    if (!req.__USER__?.id) {
      return res.status(401).json({ error: "Неавторизован" });
    }

    const statistics = await ReportsService.getStatistics(req);

    return res.status(200).json(statistics.toDTO());
  }
}
