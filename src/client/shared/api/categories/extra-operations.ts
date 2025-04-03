import type { AxiosRequestConfig } from "axios";

import type { CategoriesDto } from "common/types/category.types";

import { categoriesApiInstance } from "./api-instance";

export function getCategories(options?: AxiosRequestConfig) {
  return categoriesApiInstance<CategoriesDto>(
    {
      url: `/categories`,
      method: "GET",
    },
    options
  );
}
