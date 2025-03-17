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

import type { SignInFormData } from "../../lib/schema";
import { signInSchema } from "../../lib/schema";

export function SignInForm() {
  const form = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = useCallback((values: SignInFormData) => {
    console.log(values);
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Вход в аккаунт</CardTitle>
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
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input placeholder="******" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-right text-sm">
              <Link
                href="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Забыли пароль?
              </Link>
            </div>

            <Button type="submit" className="w-full">
              Войти
            </Button>

            <div className="text-center text-sm">
              У вас ещё нет аккаунта?{" "}
              <Link href="/signup" className="text-blue-500 hover:underline">
                Зарегистрироваться
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
