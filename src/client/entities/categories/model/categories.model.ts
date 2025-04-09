import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCallback } from "react";
import type { AxiosError } from "axios";

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
    onError: (err: AxiosError<{ error: string }>) => {
      const errorMessage =
        err.response?.data?.error || "При создании категории произошла ошибка!";

      onError?.();
      toast.error(errorMessage);
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

export function useUpdateCategory({
  onSuccess,
  onError,
}: { onSuccess?: () => void; onError?: () => void } = {}) {
  const qClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: categoriesApi.updateCategory,
    retry: 3,
    onSuccess: () => {
      qClient.refetchQueries({ queryKey: [baseKey] });
      onSuccess?.();
      toast.success("Категория успешно обновлена!");
    },
    onError: (err: AxiosError<{ error: string }>) => {
      const errorMessage =
        err.response?.data?.error ||
        "При обновлении категории произошла ошибка!";

      onError?.();
      toast.error(errorMessage);
    },
  });

  const updateCategory = useCallback(
    async ({ id, data }: { id: number; data: CategoryFormData }) => {
      try {
        await mutateAsync({ id, data });
      } catch {
        // .keep
      }
    },
    [mutateAsync]
  );

  return {
    updateCategory,
    isPending,
  };
}

export function useDeleteCategory({
  onSuccess,
  onError,
}: { onSuccess?: () => void; onError?: () => void } = {}) {
  const qClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: categoriesApi.deleteCategory,
    retry: 3,
    onSuccess: () => {
      qClient.refetchQueries({ queryKey: [baseKey] });
      onSuccess?.();
      toast.success("Категория успешно удалена!");
    },
    onError: (err: AxiosError<{ error: string }>) => {
      const errorMessage =
        err.response?.data?.error || "При удалении категории произошла ошибка!";

      onError?.();
      toast.error(errorMessage);
    },
  });

  const deleteCategory = useCallback(
    async (id: number) => {
      try {
        await mutateAsync(id);
      } catch {
        // .keep
      }
    },
    [mutateAsync]
  );

  return {
    deleteCategory,
    isPending,
  };
}
