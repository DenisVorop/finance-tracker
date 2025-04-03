import type { ComponentProps } from "react";

import { useCategories } from "@/entities/categories";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export function CategoriesAutocomplete({
  value,
  ...props
}: ComponentProps<typeof Select>) {
  const { flatItems } = useCategories();
  return (
    <Select {...props} value={"" + value}>
      <SelectTrigger>
        <SelectValue placeholder="Выберите категорию" />
      </SelectTrigger>
      <SelectContent>
        {flatItems.map((category) => (
          <SelectItem key={category.id} value={"" + category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
