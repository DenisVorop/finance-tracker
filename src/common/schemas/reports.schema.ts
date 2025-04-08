import type { InferType } from "yup";
import { object, string } from "yup";

export const getReportsSchema = object({
  startDate: string()
    .matches(
      /^\d{2}.\d{2}.\d{4}$/,
      "Неверный формат даты, ожидается DD-MM-YYYY"
    )
    .nullable(),
  endDate: string()
    .matches(
      /^\d{2}.\d{2}.\d{4}$/,
      "Неверный формат даты, ожидается DD-MM-YYYY"
    )
    .nullable(),
});

export type GetReportsFormData = InferType<typeof getReportsSchema>;
