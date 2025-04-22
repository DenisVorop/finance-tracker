import { yupResolver } from "@hookform/resolvers/yup";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";

import type { BillFormData } from "common/schemas/bill.schema";
import { billSchema } from "common/schemas/bill.schema";
import { useBill } from "@/entities/bills";
import { useStableCallback } from "@/shared/hooks/use-stable-callback";

const initialCtx = {
  methods: {} as UseFormReturn<BillFormData>,
};

const BillFormContext = createContext(initialCtx);

export function BillFormProvider({ children }: { children?: ReactNode }) {
  const bill = useBill();
  const { formState, ...methods } = useForm<BillFormData>({
    resolver: yupResolver(billSchema),
    defaultValues: { ...bill, description: bill?.description || "" },
  });

  const updateBill = useStableCallback((data: BillFormData) => {
    methods.setValue("balance", data.balance);
  });

  useEffect(() => {
    if (!bill) return;
    updateBill(bill);
  }, [bill, updateBill]);

  const ctx = useMemo(
    () => ({
      methods: {
        ...methods,
        formState,
      },
    }),
    [formState, methods]
  );

  return (
    <BillFormContext.Provider value={ctx}>{children}</BillFormContext.Provider>
  );
}

export function useBillForm() {
  const context = useContext(BillFormContext);

  if (!context) {
    throw new Error("useBillForm must be used within a BillFormProvider");
  }
  return context;
}
