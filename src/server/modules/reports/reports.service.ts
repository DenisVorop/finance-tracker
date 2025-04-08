import type { NextApiRequest } from "next/types";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { ValidationError } from "yup";

import { prisma } from "common/lib/prisma";
import type { ReportDto } from "common/types/reports.types";
import { OperationType } from "common/types/operations.types";
import { exhaustiveCheck } from "common/lib/exhaustive-check";
import { getReportsSchema } from "common/schemas/reports.schema";
import { parseDate } from "common/lib/parse-date";

import { ChartOperationsModel } from "./models/reports.model";

export class ReportsService {
  static async getReports(req: NextApiRequest) {
    try {
      const user = req.__USER__;

      const { startDate, endDate } = await getReportsSchema.validate(req.query);

      // const start = new Date(startDate);
      // const end = new Date(endDate);

      let start = new Date();
      let end = new Date();

      if (startDate) {
        start = parseDate(startDate);
      }

      if (endDate) {
        end = parseDate(endDate);
      }

      const operations = await prisma.operation.findMany({
        where: {
          userId: user.id,
          date: {
            gte: start, // Дата больше или равна startDate
            lte: end, // Дата меньше или равна endDate
          },
        },
        select: {
          amount: true,
          type: true,
          date: true,
        },
      });

      const grouped: Record<string, { income: number; expense: number }> = {};

      for (const op of operations) {
        const day = format(op.date, "dd.MM.yyyy", { locale: ru });

        if (!grouped[day]) {
          grouped[day] = { income: 0, expense: 0 };
        }

        switch (op.type) {
          case OperationType.DEPOSIT:
            grouped[day].income += Number(op.amount);
            break;
          case OperationType.WITHDRAWAL:
            grouped[day].expense += Number(op.amount);
            break;
          default: {
            exhaustiveCheck(op.type);
          }
        }
      }

      const chartData: ReportDto[] = Object.entries(grouped)
        .map(([day, values]) => ({
          day,
          income: values.income,
          expense: Math.abs(values.expense), // расходы положительные для графика
        }))
        .sort((a, b) => {
          const [d1, m1, y1] = a.day.split(".").map(Number);
          const [d2, m2, y2] = b.day.split(".").map(Number);
          return (
            new Date(y1, m1 - 1, d1).getTime() -
            new Date(y2, m2 - 1, d2).getTime()
          );
        });

      return ChartOperationsModel.fromDTO(chartData);
    } catch (err) {
      if (err instanceof ValidationError) {
        return ChartOperationsModel.Error({
          code: 400,
          message: err.errors.join(", "),
        });
      }

      return ChartOperationsModel.Error({
        code: 500,
        message: "Internal Server Error",
      });
    }
  }
}
