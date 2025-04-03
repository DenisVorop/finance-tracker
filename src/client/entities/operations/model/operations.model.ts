import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import type {
  Operation,
  OperationsModelDto,
} from "common/types/operations.types";
import { operationsApi } from "@/shared/api/operations";
import type {
  GetOperationsQuery,
  OperationFormData,
} from "common/schemas/operation.schema";

const baseKey = "operations";

export const setOperationsFromCtx = (ctx: App.PageContext) => {
  const params = ctx.req.__OPERATIONS__?.params;
  return [
    [baseKey, params],
    { pages: [ctx.req.__OPERATIONS__], pageParams: [params] },
  ] as const;
};

export function useOperations({
  billId,
}: {
  billId?: number;
} = {}) {
  const [params, setParams] = useState<GetOperationsQuery>({
    page: 1,
    pageSize: 10,
  });

  const { data, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteQuery<OperationsModelDto>({
      queryKey: [baseKey, { ...params, billId }],
      queryFn: ({ pageParam = {}, signal }) => {
        const queryParams = {
          page: (pageParam as GetOperationsQuery).page ?? params.page,
          pageSize: params.pageSize,
          billId,
        };

        return operationsApi.getOperations(queryParams, { signal });
      },
      staleTime: Infinity,
      gcTime: Infinity,
      retry: 3,

      getNextPageParam: (lastPage, loadedPages) => {
        if (!lastPage?.total) return;

        const total = lastPage.total;
        const loaded = loadedPages.reduce(
          (sum, page) => sum + (page?.data?.length ?? 0),
          0
        );
        const hasMore = loaded < total;

        return hasMore
          ? {
              page: (lastPage?.params.page ?? loadedPages.length) + 1,
              pageSize: params.pageSize,
            }
          : undefined;
      },

      initialPageParam: {
        page: 1,
        pageSize: 10,
      },
    });

  const updateParams = useCallback((params: GetOperationsQuery) => {
    setParams(params);
  }, []);

  const total = data?.pages[0]?.total ?? 0;
  const limit = data?.pages[0]?.params.pageSize ?? 5;
  const flatItems = data?.pages.flatMap((page) => page.data) || [];
  const remaining = total - flatItems.length;
  const take = Math.min(limit, remaining);

  const isSsrEmpty = data?.pages[0]?._isEmpty;
  const isSsrError = data?.pages[0]?._isError;

  return {
    flatItems,
    isLoading,
    isSsrEmpty,
    isSsrError,
    total,
    limit,
    remaining,
    take,
    hasNextPage,
    fetchNextPage,
    updateParams,
  };
}

export function useCreateOperation({
  onSuccess,
  onError,
}: { onSuccess?: (_: Operation) => void; onError?: () => void } = {}) {
  const qClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: operationsApi.createOperation,
    onSuccess: (data) => {
      qClient.refetchQueries({ queryKey: [baseKey] });
      qClient.refetchQueries({ queryKey: ["bill"] });
      onSuccess?.(data);
      toast.success("Операция успешно добавлена!");
    },
    onError: () => {
      onError?.();
      toast.error("При добавлении операции произошла ошибка!");
    },
  });

  const createOperation = useCallback(
    async (data: OperationFormData) => {
      try {
        mutate(data);
      } catch {
        // .keep
      }
    },
    [mutate]
  );

  return { createOperation, isPending };
}
