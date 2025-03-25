import type { ComponentType } from "react";

import { ComposeProviders } from "@/shared/lib/react";

import { BillFormProvider } from "./bill-form.provider";

export function withBillProviders<P extends object>(
  Component: ComponentType<P>
) {
  return function WithProviders(props: P) {
    return (
      <ComposeProviders>
        <BillFormProvider />
        <Component {...props} />
      </ComposeProviders>
    );
  };
}
