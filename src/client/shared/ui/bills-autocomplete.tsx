import type { ComponentProps } from "react";

import { useBills } from "@/entities/bills";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export function BillsAutocomplete({
  value,
  ...props
}: ComponentProps<typeof Select>) {
  const { flatItems } = useBills();
  return (
    <Select {...props} value={"" + value}>
      <SelectTrigger>
        <SelectValue placeholder="Выберите счёт" />
      </SelectTrigger>
      <SelectContent>
        {flatItems.map((bill) => (
          <SelectItem key={bill.id} value={"" + bill.id}>
            {bill.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
