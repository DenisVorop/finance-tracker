import type { ReactNode } from "react";

import { Header } from "@/features/common";
import { Toaster } from "@/shared/ui/sonner";

export function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}

      {/* Под прибитую шапку на мобилке */}
      <div className="h-[77px] md:h-0" />
      <Toaster />
    </>
  );
}
