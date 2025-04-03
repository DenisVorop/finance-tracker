import { useForm } from "react-hook-form";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";

import { useSignup } from "@/entities/auth";
import { navigate } from "@/shared/lib/navigate";
import type { SignUpFormData } from "common/schemas/signup.schema";
import { signUpSchema } from "common/schemas/signup.schema";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { FormControl } from "@/shared/ui/form-control";

export function SignUpForm() {
  const { mutateAsync, isPending } = useSignup({
    onSuccess() {
      navigate({ href: "/signin" });
    },
  });

  const form = useForm<SignUpFormData>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = useCallback(
    async (values: SignUpFormData) => {
      await mutateAsync(values);
    },
    [mutateAsync]
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Регистрация</CardTitle>
      </CardHeader>

      <CardContent>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormControl
            control={form.control}
            name="email"
            controlType="text"
            controlLabel="Email"
            type="email"
            placeholder="ivanov@yandex.ru"
          />

          <FormControl
            control={form.control}
            name="password"
            controlType="text"
            controlLabel="Пароль"
            type="password"
            placeholder="******"
          />

          <FormControl
            control={form.control}
            name="confirmPassword"
            controlType="text"
            controlLabel="Повторите пароль"
            type="password"
            placeholder="******"
          />

          <Button type="submit" className="w-full" isLoading={isPending}>
            {isPending ? "Регистрируем" : "Зарегистрироваться"}
          </Button>

          <div className="text-center text-sm">
            Уже есть аккаунт?{" "}
            <Link href="/signin" className="text-blue-500 hover:underline">
              Войти
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
