import { yupResolver } from "@hookform/resolvers/yup";
import type { ReactNode } from "react";
import { createContext, useContext, useMemo, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";

import { BillType } from "common/types/bill.types";
import type { BillFormData } from "common/schemas/bill.schema";
import { billSchema } from "common/schemas/bill.schema";

const initialCtx = {
  methods: {} as UseFormReturn<BillFormData>,
  openModal: false,
  toggle: () => {},
};

const CategoryFormContext = createContext(initialCtx);

export function CategoryFormProvider({ children }: { children?: ReactNode }) {
  const [openModal, setOpenModal] = useState(false);
  const { formState, ...methods } = useForm<BillFormData>({
    resolver: yupResolver(billSchema),
    defaultValues: _prepareInitialData(),
  });

  const ctx = useMemo(
    () => ({
      methods: {
        ...methods,
        formState,
      },

      openModal,
      toggle: () => setOpenModal((prev) => !prev),
    }),
    [formState, methods, openModal]
  );

  return (
    <CategoryFormContext.Provider value={ctx}>
      {children}
    </CategoryFormContext.Provider>
  );
}

export function useCategoryForm() {
  const context = useContext(CategoryFormContext);

  if (!context) {
    throw new Error("useBillForm must be used within a BillFormProvider");
  }
  return context;
}

function _prepareInitialData() {
  return {
    name: "",
    type: BillType.REGULAR,
    backgroundColor: "#1d65c4",
    emoji: "💰",
    description: "",
    balance: 0,
    includeInTotal: true,
  };
}
