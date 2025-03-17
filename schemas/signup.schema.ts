import type { InferType } from "yup";
import { object, string, ref } from "yup";

export const signUpSchema = object({
  email: string().required("Введите email").email("Некорректный email"),
  password: string()
    .required("Введите пароль")
    .min(6, "Пароль должен содержать минимум 6 символов"),
  confirmPassword: string()
    .required("Повторите пароль")
    .oneOf([ref("password")], "Пароли не совпадают"),
});

export type SignUpFormData = InferType<typeof signUpSchema>;
