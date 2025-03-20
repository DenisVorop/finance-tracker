import { yupResolver } from "@hookform/resolvers/yup";
import type { MutableRefObject, ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";

import { BillType } from "common/types/bill.types";

import type { FormValues } from "../lib/schema";
import { formSchema } from "../lib/schema";

const initialCtx = {
  methods: {} as UseFormReturn<FormValues>,
};

const BillFormContext = createContext(initialCtx);

export function BillFormProvider({ children }: { children?: ReactNode }) {
  const { formState, ...methods } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: _prepareInitialData(),
  });

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
