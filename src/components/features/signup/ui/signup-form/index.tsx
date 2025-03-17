import { useForm } from "react-hook-form";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { SignUpFormData } from "$/signup.schema";
import { signUpSchema } from "$/signup.schema";
import { useSignup } from "@/entities/signup";
import { navigate } from "@/lib/navigate";

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
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="ivanov@yandex.ru" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Придумайте пароль</FormLabel>
                  <FormControl>
                    <Input placeholder="******" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Повторите пароль</FormLabel>
                  <FormControl>
                    <Input placeholder="******" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
        </Form>
      </CardContent>
    </Card>
  );
}
