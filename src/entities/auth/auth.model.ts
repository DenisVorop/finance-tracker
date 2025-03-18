import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { SignInResponse } from "@/api/auth";
import { authApi } from "@/api/auth";
import { navigate } from "@/lib/navigate";

const baseKey = "auth";

export const setUserFromCtx = (ctx: App.PageContext) => {
  return [[baseKey], ctx.req.__USER__] as const;
};

export function useAuth() {
  const qClient = useQueryClient();

  const { data } = useQuery<SignInResponse | null>({
    queryKey: [baseKey],
    queryFn: () => qClient.getQueryData([baseKey]) as SignInResponse | null,
    initialData: null,
  });

  const { mutate } = useMutation({
    mutationFn: async (data: SignInResponse) =>
      qClient.setQueryData([baseKey], data),
  });

  return [data, mutate] as const;
}

export function useSignup({
  onSuccess,
  onError,
}: { onSuccess?: () => void; onError?: () => void } = {}) {
  const data = useMutation({
    mutationFn: authApi.signup,
    onSuccess,
    onError,
  });

  return data;
}

export function useSignin({
  onSuccess,
  onError,
}: { onSuccess?: () => void; onError?: () => void } = {}) {
  const [, setAuthData] = useAuth();

  const data = useMutation({
    mutationFn: authApi.signin,
    onSuccess(data) {
      setAuthData(data);
      onSuccess?.();
    },
    onError,
  });

  return data;
}

export function useSignout() {
  const { mutate: signOut, isPending } = useMutation({
    mutationFn: () => authApi.signout(),
    onSuccess() {
      navigate({ href: "/signin" });
    },
  });

  return {
    isPending,
    signOut,
  };
}
