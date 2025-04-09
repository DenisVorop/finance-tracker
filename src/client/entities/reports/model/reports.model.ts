import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import type {
  ReportsModelDto,
  ReportStatisticsModelDto,
} from "common/types/reports.types";
import { reportsApi } from "@/shared/api/reports";
import type { GetReportsFormData } from "common/schemas/reports.schema";
import { formatDate } from "common/lib/parse-date";

const baseKey = "reports";

export function useReportsParams() {
  const qClient = useQueryClient();

  const { data: params } = useQuery({
    queryKey: [baseKey, "params"],
    queryFn: () =>
      qClient.getQueryData([baseKey, "params"]) as GetReportsFormData,
    initialData: _getBaseData(),
  });

  const updateParams = useCallback(
    (newParams: GetReportsFormData) => {
      qClient.setQueryData([baseKey, "params"], newParams);
    },
    [qClient]
  );

  return { params, updateParams };
}

export function useReports() {
  const { params, updateParams } = useReportsParams();

  const { data } = useQuery<ReportsModelDto>({
    queryKey: [baseKey, params],
    queryFn: () => reportsApi.getReports(params),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return {
    data: data?.data || [],
    updateParams,
    initialParams: _getBaseData(),
  };
}

function _getBaseData() {
  const today = new Date();

  return {
    startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), 1)), // Первый день месяца
    endDate: formatDate(new Date(today.getFullYear(), today.getMonth() + 1, 0)), // Последний день месяца
  };
}

export function useStatistics() {
  const { data } = useQuery({
    queryKey: [baseKey, "statistics"],
    queryFn: reportsApi.getStatistics,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return {
    data: data?.data,
    isError: data?._isError,
    isEmpty: data?._isEmpty,
  };
}

export function useCategoriesSummary() {
  const { data } = useQuery({
    queryKey: [baseKey, "categories-summary"],
    queryFn: reportsApi.getCategoriesSummary,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return {
    data: data?.data,
    isError: data?._isError,
    isEmpty: data?._isEmpty,
  };
}
