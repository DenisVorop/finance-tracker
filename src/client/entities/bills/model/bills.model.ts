import { useQuery } from "@tanstack/react-query";

import { billsApi } from "@/shared/api/bills";
import type { BillsDto } from "common/types/bill.types";

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
