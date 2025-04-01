import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";

import type { Operation, OperationsDto } from "common/types/operations.types";
import { operationsApi } from "@/shared/api/operations";
import type { OperationFormData } from "common/schemas/operation.schema";

const baseKey = "operations";

export const setOperationsFromCtx = (ctx: App.PageContext) => {
  return [[baseKey], ctx.req.__BILLS__] as const;
};

export function useOperations() {
  const { data, isLoading, error } = useQuery<OperationsDto>({
    queryKey: [baseKey],
    queryFn: operationsApi.getOperations,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 3,
  });

  const flatItems = data?.data || [];

  const _isEmpty = error && "status" in error ? error.status === 404 : false;

  return { flatItems, isLoading, _isEmpty };
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
