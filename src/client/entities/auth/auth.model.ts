import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { authApi } from "@/shared/api/auth";
import { navigate } from "@/shared/lib/navigate";
import type { SessionDto } from "common/types/session.types";

const baseKey = "auth";

export const setUserFromCtx = (ctx: App.PageContext) => {
  return [[baseKey], ctx.req.__USER__] as const;
};

export function useAuth() {
  const qClient = useQueryClient();

  const { data } = useQuery<SessionDto["user"]>({
    queryKey: [baseKey],
    queryFn: () => qClient.getQueryData([baseKey]) as SessionDto["user"],
  });

  const { mutate } = useMutation({
    mutationFn: async (data: SessionDto["user"]) =>
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
  const data = useMutation({
    mutationFn: authApi.signin,
    onSuccess,
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
