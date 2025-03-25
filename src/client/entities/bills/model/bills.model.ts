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

  return { ...query, totalAmount };
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
        mutateAsync(data);
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
  const id = Number(useParams().id);

  const { data } = useQuery<Bill>({
    queryKey: [baseKey, id],
    queryFn: () => billsApi.getBill(id),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return {
    data,
  };
}
