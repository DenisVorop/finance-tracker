import type { InferType } from "yup";
import { object, string } from "yup";

export const categorySchema = object().shape({
  name: string()
    .trim()
    .min(2, "Минимум 2 символа")
    .max(50, "Максимум 50 символов")
    .required("Название обязательно"),
  description: string()
    .max(255, "Максимальная длина описания — 255 символов")
    .nullable(),
});

export type CategoryFormData = InferType<typeof categorySchema>;
