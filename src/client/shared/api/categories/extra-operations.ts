import type { AxiosRequestConfig } from "axios";

import type { CategoriesDto, Category } from "common/types/category.types";
import type { CategoryFormData } from "common/schemas/category.schema";

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

export function createCategory(
  data: CategoryFormData,
  options?: AxiosRequestConfig
) {
  return categoriesApiInstance<Category>(
    {
      url: `/categories`,
      method: "POST",
      data,
    },
    options
  );
}

export function deleteCategory(id: number, options?: AxiosRequestConfig) {
  return categoriesApiInstance<Category>(
    {
      url: `/categories/${id}`,
      method: "DELETE",
    },
    options
  );
}

export function updateCategory(
  { id, data }: { id: number; data: CategoryFormData },
  options?: AxiosRequestConfig
) {
  return categoriesApiInstance<Category>(
    {
      url: `/categories/${id}`,
      method: "PUT",
      data,
    },
    options
  );
}
