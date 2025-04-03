import type { ReactNode } from "react";

import { Toaster } from "@/shared/ui/sonner";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}

      <Toaster />
    </>
  );
}
