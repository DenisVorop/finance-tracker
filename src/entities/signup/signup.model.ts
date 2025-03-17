import { useMutation } from "@tanstack/react-query";

import { signupApi } from "@/api/signup";

export function useSignup({
  onSuccess,
  onError,
}: { onSuccess?: () => void; onError?: () => void } = {}) {
  const data = useMutation({
    mutationFn: signupApi.signup,
    onSuccess,
    onError,
  });

  return data;
}
