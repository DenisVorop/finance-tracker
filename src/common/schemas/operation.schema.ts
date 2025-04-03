import type { InferType } from "yup";
import { number, object, string, date, mixed } from "yup";

import { OperationType } from "common/types/operations.types";

export const operationSchema = object().shape({
  amount: number()
    .transform((value, originalValue) => {
      const parsed = Number(originalValue);
      return isNaN(parsed) ? undefined : parsed;
    })
    .required("Сумма обязательна"),
  category: string()
    .trim()
    .min(2, "Минимум 2 символа")
    .max(50, "Максимум 50 символов")
    .optional(),
  date: date().required("Дата обязательна"),
  note: string()
    .max(255, "Максимальная длина заметки — 255 символов")
    .nullable(),
  billId: number().required("ID счета обязателен"),
  userId: number().required("ID пользователя обязателен"),
  type: mixed<OperationType>()
    .oneOf(
      Object.values(OperationType || {}) as OperationType[],
      "Неверный тип операции"
    )
    .required("Тип операции обязателен"),
});

export type OperationFormData = InferType<typeof operationSchema>;

export const getOperationsQuerySchema = object().shape({
  page: number().required("Номер страницы обязателен"),
  pageSize: number().required("Размер страницы обязателен"),
  billId: number().optional(),
});

export type GetOperationsQuery = InferType<typeof getOperationsQuerySchema>;
