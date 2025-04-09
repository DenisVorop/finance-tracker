import type { NextApiRequest } from "next/types";
import { format, startOfWeek } from "date-fns";
import { ru } from "date-fns/locale";
import { ValidationError } from "yup";

import { prisma } from "common/lib/prisma";
import type { CategorySummaryDto, ReportDto } from "common/types/reports.types";
import { OperationType } from "common/types/operations.types";
import { exhaustiveCheck } from "common/lib/exhaustive-check";
import { getReportsSchema } from "common/schemas/reports.schema";
import { parseDate } from "common/lib/parse-date";

import { ChartOperationsModel } from "./models/reports.model";
import { StatisticsModel } from "./models/statistics.model";
import { CategoriesSummaryModel } from "./models/categories-summary.model";

export class ReportsService {
  static async getReports(req: NextApiRequest) {
    try {
      const user = req.__USER__;

      const { startDate, endDate } = await getReportsSchema.validate(req.query);

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

  static async getStatistics(req: NextApiRequest) {
    try {
      const user = req.__USER__;
      const today = new Date();

      const start = startOfWeek(new Date(), { weekStartsOn: 1 }); // Понедельник

      const operations = await prisma.$queryRaw<
        {
          day: string;
          income: number;
          expense: number;
        }[]
      >`
        SELECT 
          DATE("date") as day,
          SUM(CASE WHEN "type" = 'DEPOSIT' THEN "amount" ELSE 0 END) AS income,
          SUM(CASE WHEN "type" = 'WITHDRAWAL' THEN "amount" ELSE 0 END) AS expense
        FROM "Operation"
        WHERE "userId" = ${user.id}
        GROUP BY day
      `;

      let totalIncome = 0;
      let totalExpense = 0;
      let todayIncome = 0;
      let todayExpense = 0;
      let weekIncome = 0;
      let weekExpense = 0;

      for (const op of operations) {
        const date = new Date(op.day);
        const income = Number(op.income);
        const expense = Number(op.expense);

        totalIncome += income;
        totalExpense += expense;

        if (
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
        ) {
          todayIncome += income;
          todayExpense += expense;
        }

        if (date >= start && date <= today) {
          weekIncome += income;
          weekExpense += expense;
        }
      }

      const uniqueDays = operations.length || 1;

      return StatisticsModel.fromDTO({
        averageIncomePerDay: totalIncome / uniqueDays,
        todayIncome,
        weekIncome,
        averageExpensePerDay: totalExpense / uniqueDays,
        todayExpense,
        weekExpense,
      });
    } catch {
      return StatisticsModel.Error({
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async getCategoriesSummary(req: NextApiRequest) {
    try {
      const user = req.__USER__;

      const categories = await prisma.$queryRaw<CategorySummaryDto[]>`
      SELECT 
        c."name" as name,
        SUM(o."amount") as amount,
        o."type" as type
      FROM "Operation" o
      JOIN "Category" c ON o."categoryId" = c."id"
      WHERE o."userId" = ${user.id}
      GROUP BY c."name", o."type"
    `;

      let totalIncome = 0;
      let totalExpense = 0;

      for (const c of categories) {
        if (c.type === OperationType.DEPOSIT) totalIncome += Number(c.amount);
        else if (c.type === OperationType.WITHDRAWAL)
          totalExpense += Number(c.amount);
      }

      return CategoriesSummaryModel.fromDTO(
        categories.map((c) => {
          const amount = Number(c.amount);
          const percent =
            c.type === OperationType.DEPOSIT
              ? (amount / totalIncome) * 100
              : (amount / totalExpense) * 100;

          return {
            name: c.name,
            amount,
            type: c.type,
            percent: Math.round(percent),
          };
        })
      );
    } catch {
      return CategoriesSummaryModel.Error({
        code: 500,
        message: "Internal Server Error",
      });
    }
  }
}
