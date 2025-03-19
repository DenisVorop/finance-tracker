import type { AxiosRequestConfig } from "axios";

import type { BillsDto } from "common/types/bill.types";

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
