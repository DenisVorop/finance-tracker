import type { AxiosRequestConfig } from "axios";

import { exampleApiInstance } from "./api-instance";

export type Example = NonNullable<App.ExtendedContext["req"]["__EXAMPLE__"]>;

export function getExample(options?: AxiosRequestConfig) {
  return exampleApiInstance<Example>(
    {
      url: `/example`,
      method: "GET",
    },
    options
  );
}
