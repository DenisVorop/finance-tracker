import type { OperationType } from "./operations.types";

export interface ReportDto {
  day: string;
  income: number;
  expense: number;
}

export interface ReportsModelDto {
  data: ReportDto[];
  _isError: boolean;
  _isEmpty: boolean;
}

export interface ReportStatisticsDto {
  averageIncomePerDay: number;
  todayIncome: number;
  weekIncome: number;
  averageExpensePerDay: number;
  todayExpense: number;
  weekExpense: number;
}

export interface ReportStatisticsModelDto {
  data: ReportStatisticsDto;
  _isError: boolean;
  _isEmpty: boolean;
}

export interface CategorySummaryDto {
  name: string;
  amount: number;
  type: OperationType;
  percent: number;
}

export interface CategorySummaryModelDto {
  data: CategorySummaryDto[];
  _isError: boolean;
  _isEmpty: boolean;
}
