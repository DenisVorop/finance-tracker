import React from "react";
import { DefaultLayout } from "@/app/layouts";
import { injectLayout } from "@/shared/lib/next";
import { TransactionsFeature } from "@/features/transactions";

export function TransactionsPage() {
  return <TransactionsFeature />;
}

export default injectLayout(TransactionsPage, DefaultLayout); 