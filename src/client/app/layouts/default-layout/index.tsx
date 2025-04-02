import type { ReactNode } from "react";

import { Header } from "@/features/common";
import { Toaster } from "@/shared/ui/sonner";

export function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />

      <div className="container my-4 lg:my-8">
        <div className="flex flex-col gap-4 lg:gap-6">{children}</div>
      </div>

      {/* Под прибитую шапку на мобилке */}
      <div className="h-[77px] md:h-0" />
      <Toaster />
    </>
  );
}
