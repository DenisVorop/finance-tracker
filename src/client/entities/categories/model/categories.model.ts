import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCallback } from "react";

import type { CategoriesDto } from "common/types/category.types";
import { categoriesApi } from "@/shared/api/categories";
import type { CategoryFormData } from "common/schemas/category.schema";

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

  const flatItems = query.data?.categories || [];

  const isEmpty = query.data?._isEmpty;
  const isError = query.data?._isError;

  return { ...query, flatItems, isEmpty, isError };
}

export function useCreateCategory({
  onSuccess,
  onError,
}: { onSuccess?: () => void; onError?: () => void } = {}) {
  const qClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: categoriesApi.createCategory,
    retry: 3,
    onSuccess: () => {
      qClient.refetchQueries({ queryKey: [baseKey] });
      onSuccess?.();
      toast.success("Категория успешно добавлена!");
    },
    onError: () => {
      onError?.();
      toast.error("При создании категории произошла ошибка!");
    },
  });

  const createCategory = useCallback(
    async (data: CategoryFormData) => {
      try {
        await mutateAsync(data);
      } catch {
        // .keep
      }
    },
    [mutateAsync]
  );

  return {
    createCategory,
    isPending,
  };
}
