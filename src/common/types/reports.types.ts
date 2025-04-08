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
