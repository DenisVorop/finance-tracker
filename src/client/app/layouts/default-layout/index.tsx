import type { ReactNode } from "react";

import { Header } from "@/features/common";

export function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
