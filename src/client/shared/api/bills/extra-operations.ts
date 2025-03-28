import type { AxiosRequestConfig } from "axios";

import type { Bill, BillsDto } from "common/types/bill.types";
import type { BillFormData } from "common/schemas/bill.schema";

import { billsApiInstance } from "./api-instance";

export function getBills(options?: AxiosRequestConfig) {
  return billsApiInstance<BillsDto>(
    {
      url: `/bills`,
      method: "GET",
    },
    options
  );
}

export function createBill(data: BillFormData, options?: AxiosRequestConfig) {
  return billsApiInstance<BillsDto>(
    {
      url: `/bills`,
      method: "POST",
      data,
    },
    options
  );
}

export function getBill(id: number, options?: AxiosRequestConfig) {
  return billsApiInstance<Bill>(
    {
      url: `/bills/${id}`,
      method: "GET",
    },
    options
  );
}

export function deleteBill(id: number, options?: AxiosRequestConfig) {
  return billsApiInstance<BillsDto>(
    {
      url: `/bills/${id}`,
      method: "DELETE",
    },
    options
  );
}
