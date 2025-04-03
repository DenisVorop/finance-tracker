import type { ComponentType } from "react";

import { ComposeProviders } from "@/shared/lib/react";

import { CategoryFormProvider } from "./category-form.provider";

export function withCategoryProviders<P extends object>(
  Component: ComponentType<P>
) {
  return function WithProviders(props: P) {
    return (
      <ComposeProviders>
        <CategoryFormProvider />
        <Component {...props} />
      </ComposeProviders>
    );
  };
}
