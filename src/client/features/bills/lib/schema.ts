import * as yup from "yup";

export const formSchema = yup.object().shape({
  name: yup.string().required("Название обязательно"),
  type: yup
    .string()
    .oneOf(["REGULAR", "SAVINGS", "DEBT_OWE", "DEBT_LEND"])
    .required("Выберите тип счёта"),
  backgroundColor: yup.string().required("Выберите цвет фона"),
  emoji: yup.string().required("Выберите эмодзи"),
  description: yup.string().optional(),
  balance: yup
    .number()
    .typeError("Баланс должен быть числом")
    .min(0, "Баланс не может быть отрицательным")
    .required("Введите баланс"),
  includeInTotal: yup.boolean().required(),
});

export type FormValues = yup.InferType<typeof formSchema>;
