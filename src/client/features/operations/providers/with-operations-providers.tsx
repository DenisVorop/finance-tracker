import type { ComponentType } from "react";

import { ComposeProviders } from "@/shared/lib/react";

import { OperationsFormProvider } from "./operations-form.provider";

export function withOperationsProviders<P extends object>(
  Component: ComponentType<P>
) {
  return function WithProviders(props: P) {
    return (
      <ComposeProviders>
        <OperationsFormProvider />
        <Component {...props} />
      </ComposeProviders>
    );
  };
}
