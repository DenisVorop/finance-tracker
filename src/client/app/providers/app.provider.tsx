import type { ReactNode } from "react";
import type { DehydratedState } from "@tanstack/react-query";

import { ComposeProviders } from "@/shared/lib/react";
import { QueryStateProvider } from "@/shared/lib/query-state-manager";

import { QueryClientProvider } from "./query-client.provider";

export function AppProvider({
  initialState,
  children,
}: {
  initialState: DehydratedState;
  children: ReactNode;
}) {
  return (
    <ComposeProviders>
      <QueryClientProvider initialState={initialState} />
      <QueryStateProvider />
      {children}
    </ComposeProviders>
  );
}
