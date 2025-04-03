import { useQuery } from "@tanstack/react-query";

import type { CategoriesDto } from "common/types/category.types";
import { categoriesApi } from "@/shared/api/categories";

const baseKey = "categories";

export const setCategoriesFromCtx = (ctx: App.PageContext) => {
  return [[baseKey], ctx.req.__CATEGORIES__] as const;
};

export function useCategories() {
  const query = useQuery<CategoriesDto>({
    queryKey: [baseKey],
    queryFn: categoriesApi.getCategories,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const flatItems = query.data?.data || [];

  const isEmpty = query.data?._isEmpty;
  const isError = query.data?._isError;

  return { ...query, flatItems, isEmpty, isError };
}
