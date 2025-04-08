import * as React from "react";

import { PageHeader } from "@/shared/ui/page-header";

import { ReportsRangePicker } from "../reports-range-picker";

export function ReportsHeader() {
  return (
    <PageHeader title="Отчеты">
      <ReportsRangePicker />
    </PageHeader>
  );
}
