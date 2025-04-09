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
