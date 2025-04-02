import type { ReactNode } from "react";

export function PageHeader({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex justify-between flex-col gap-4 lg:gap-6 lg:flex-row lg:items-center">
      <div className="title">{title}</div>

      {children}
    </div>
  );
}
