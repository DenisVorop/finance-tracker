import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";

import { billsApi } from "@/shared/api/bills";
import type { Bill, BillsDto } from "common/types/bill.types";
import type { BillFormData } from "common/schemas/bill.schema";

const baseKey = "bills";

export const setBillsFromCtx = (ctx: App.PageContext) => {
  return [[baseKey], ctx.req.__BILLS__] as const;
};

export function useBills() {
  const query = useQuery<BillsDto>({
    queryKey: [baseKey],
    queryFn: billsApi.getBills,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const totalAmount =
    query.data?.data.reduce((acc, cur) => {
      if (!cur.includeInTotal) {
        return acc;
      }

      acc = acc + cur.balance;
      return acc;
    }, 0) || 0;

  const flatItems = query.data?.data || [];

  return { ...query, flatItems, totalAmount };
}

export function useCreateBill({
  onSuccess,
  onError,
}: { onSuccess?: () => void; onError?: () => void } = {}) {
  const qClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: billsApi.createBill,
    retry: 3,
    onSuccess: () => {
      qClient.refetchQueries({ queryKey: [baseKey] });
      onSuccess?.();
      toast.success("Счет успешно создан!");
    },
    onError: () => {
      onError?.();
      toast.error("При создании счета произошла ошибка!");
    },
  });

  const createBill = useCallback(
    async (data: BillFormData) => {
      try {
        await mutateAsync(data);
      } catch {
        // .keep
      }
    },
    [mutateAsync]
  );

  return {
    createBill,
    isPending,
  };
}

export const setBillFromCtx = (ctx: App.PageContext) => {
  const bill = ctx.req.__BILL__;
  return [[baseKey, bill?.id], bill] as const;
};

export function useBill() {
  const params = useParams();
  const id = Number(params.id);

  const { data } = useQuery<Bill>({
    queryKey: [baseKey, id],
    queryFn: () => billsApi.getBill(id),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!id,
  });

  return data;
}

export function useDeleteBill({
  onSuccess,
  onError,
}: { onSuccess?: () => void; onError?: () => void } = {}) {
  const qClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: billsApi.deleteBill,
    onSuccess: () => {
      qClient.refetchQueries({ queryKey: [baseKey] });
      toast.success("Счет успешно удален!");
      onSuccess?.();
    },
    onError: () => {
      toast.error("При удалении счета произошла ошибка!");
      onError?.();
    },
  });

  const deleteBill = useCallback(
    async (id: number) => {
      try {
        mutateAsync(id);
      } catch {
        // .keep
      }
    },
    [mutateAsync]
  );

  return {
    deleteBill,
    isPending,
  };
}

export function useUpdateBill() {
  const qClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: BillFormData }) =>
      billsApi.updateBill(id, data),
    onSuccess: ({ id }) => {
      qClient.refetchQueries({ queryKey: [baseKey, id] });
      toast.success("Счет успешно обновлен!");
    },
    onError: () => {
      toast.error("При обновлении счета произошла ошибка!");
    },
  });

  const updateBill = useCallback(
    async (id: number, data: BillFormData) => {
      try {
        const updatedBill = await mutateAsync({ id, data });
        return updatedBill;
      } catch {
        // .keep
      }
    },
    [mutateAsync]
  );

  return {
    updateBill,
    isPending,
  };
}

export function useSetBill() {
  const qClient = useQueryClient();

  return (bill: Bill) => {
    qClient.setQueryData([baseKey, bill.id], bill);
  };
}
