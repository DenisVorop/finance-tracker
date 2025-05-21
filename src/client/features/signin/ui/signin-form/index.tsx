import { useForm } from "react-hook-form";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { useSignin } from "@/entities/auth";
import { navigate } from "@/shared/lib/navigate";
import type { SignInFormData } from "common/schemas/signin.schema";
import { signInSchema } from "common/schemas/signin.schema";
import { FormControl } from "@/shared/ui/form-control";

export function SignInForm() {
  const { mutateAsync, isPending } = useSignin({
    onSuccess() {
      navigate({ href: "/" });
    },
  });

  const { control, formState, handleSubmit } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = useCallback(
    async (values: SignInFormData) => {
      await mutateAsync(values);
    },
    [mutateAsync]
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Вход в аккаунт</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            control={control}
            controlLabel="Email"
            controlType="text"
            type="email"
            name="email"
            placeholder="ivanov@yandex.ru"
            errorMessage={formState.errors.email?.message}
          />

          <FormControl
            control={control}
            controlLabel="Пароль"
            controlType="text"
            type="password"
            name="password"
            placeholder="******"
            errorMessage={formState.errors.password?.message}
          />

          <Button type="submit" className="w-full" isLoading={isPending}>
            {isPending ? "Входим..." : "Войти"}
          </Button>

          <div className="text-center text-sm">
            У вас ещё нет аккаунта?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Зарегистрироваться
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
