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

import type { CategoryFormData } from "common/schemas/category.schema";
import { categorySchema } from "common/schemas/category.schema";
import type { Category } from "common/types/category.types";

const initialCtx = {
  methods: {} as UseFormReturn<Partial<Category> & CategoryFormData>,
  openModal: false,
  toggle: () => {},
  setInitialData: (_: Partial<CategoryFormData>) => {},
};

const CategoryFormContext = createContext(initialCtx);

export function CategoryFormProvider({ children }: { children?: ReactNode }) {
  const [openModal, setOpenModal] = useState(false);
  const { formState, ...methods } = useForm<
    Partial<Category> & CategoryFormData
  >({
    resolver: yupResolver(categorySchema),
    defaultValues: _prepareInitialData(),
  });

  const setInitialData = useCallback(
    (data: Partial<CategoryFormData>) => {
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

      openModal,
      toggle: () => setOpenModal((prev) => !prev),

      setInitialData,
    }),
    [formState, methods, openModal, setInitialData]
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

function _prepareInitialData(): CategoryFormData {
  return {
    name: "",
    description: "",
  };
}
