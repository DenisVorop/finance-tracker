import type { InferType } from "yup";
import { boolean, mixed, number, object, string } from "yup";

import type { BillType } from "common/types/bill.types";

export const billSchema = object().shape({
  name: string()
    .trim()
    .min(2, "Минимум 2 символа")
    .max(50, "Максимум 50 символов")
    .required("Название обязательно"),
  type: mixed<BillType>()
    .oneOf(
      ["REGULAR", "SAVINGS", "DEBT_OWE", "DEBT_LEND"],
      "Неверный тип счета"
    )
    .required("Тип счета обязателен"),
  backgroundColor: string().required("Цвет обязателен"),
  emoji: string().required("Эмодзи обязателен"),
  description: string()
    .max(255, "Максимальная длина описания — 255 символов")
    .nullable(),
  balance: number().required("Баланс обязателен"),
  includeInTotal: boolean().required("Это поле обязательно"),
});

export type BillFormData = InferType<typeof billSchema>;
