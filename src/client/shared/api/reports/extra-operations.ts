import type { AxiosRequestConfig } from "axios";

import type {
  ReportsModelDto,
  ReportStatisticsModelDto,
} from "common/types/reports.types";
import type { GetReportsFormData } from "common/schemas/reports.schema";

import { reportsApiInstance } from "./api-instance";

export function getReports(
  params: GetReportsFormData,
  options?: AxiosRequestConfig
) {
  return reportsApiInstance<ReportsModelDto>(
    {
      url: `/reports`,
      method: "GET",
      params,
    },
    options
  );
}

export function getStatistics(options?: AxiosRequestConfig) {
  return reportsApiInstance<ReportStatisticsModelDto>(
    {
      url: `/reports/statistics`,
      method: "GET",
    },
    options
  );
}
