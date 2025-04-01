import { yupResolver } from "@hookform/resolvers/yup";
import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";

import { operationSchema } from "common/schemas/operation.schema";
import type { OperationFormData } from "common/schemas/operation.schema";

const initialCtx = {
  methods: {} as UseFormReturn<OperationFormData>,
  openModal: false,
  toggle: () => {},
  setInitialData: (_: Partial<OperationFormData>) => {},
};

const OperationsFormContext = createContext(initialCtx);

export function OperationsFormProvider({ children }: { children?: ReactNode }) {
  const [openModal, setOpenModal] = useState(false);
  const { formState, ...methods } = useForm<OperationFormData>({
    resolver: yupResolver(operationSchema),
  });

  const setInitialData = useCallback(
    (data: Partial<OperationFormData>) => {
      methods.reset(data);
    },
    [methods]
  );

  const ctx = useMemo(
    () => ({
      methods: {
        ...methods,
        formState,
      },

      setInitialData,

      openModal,
      toggle: () => setOpenModal((prev) => !prev),
    }),
    [formState, methods, openModal, setInitialData]
  );

  return (
    <OperationsFormContext.Provider value={ctx}>
      {children}
    </OperationsFormContext.Provider>
  );
}

export function useOperationsForm() {
  const context = useContext(OperationsFormContext);

  if (!context) {
    throw new Error(
      "useOperationsForm must be used within a OperationsFormProvider"
    );
  }
  return context;
}
