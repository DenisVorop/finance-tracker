import type { AxiosRequestConfig } from "axios";

import type {
  Operation,
  OperationsModelDto,
} from "common/types/operations.types";
import type {
  GetOperationsQuery,
  OperationFormData,
} from "common/schemas/operation.schema";

import { operationsApiInstance } from "./api-instance";

export function getOperations(
  params: GetOperationsQuery,
  options?: AxiosRequestConfig
) {
  return operationsApiInstance<OperationsModelDto>(
    {
      url: `/operations`,
      method: "GET",
      params,
    },
    options
  );
}

export function createOperation(
  data: OperationFormData,
  options?: AxiosRequestConfig
) {
  return operationsApiInstance<Operation>(
    {
      url: `/operations`,
      method: "POST",
      data,
    },
    options
  );
}
