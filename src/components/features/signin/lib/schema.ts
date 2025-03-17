import type { InferType } from "yup";
import { object, string } from "yup";

export const signInSchema = object({
  email: string().required("Введите email").email("Некорректный email"),
  password: string()
    .required("Введите пароль")
    .min(6, "Пароль должен содержать минимум 6 символов"),
});

export type SignInFormData = InferType<typeof signInSchema>;
