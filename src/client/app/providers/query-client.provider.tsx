import type { ReactNode } from "react";
import { useState } from "react";
import {
  type DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider as BaseQCProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function QueryClientProvider({
  initialState,
  children,
}: {
  initialState: DehydratedState;
  children?: ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <BaseQCProvider client={queryClient}>
      <HydrationBoundary state={initialState}>{children}</HydrationBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </BaseQCProvider>
  );
}
