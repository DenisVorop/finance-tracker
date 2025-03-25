import type { AxiosRequestConfig } from "axios";
import getConfig from "next/config";

import { createHttpClient } from "../create-http-client";

const { apiPath } = getConfig().publicRuntimeConfig;

export async function transactionsApiInstance<T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> {
  const r = await createHttpClient(apiPath)({
    ...config,
    ...options,
  });

  return r.data;
} 