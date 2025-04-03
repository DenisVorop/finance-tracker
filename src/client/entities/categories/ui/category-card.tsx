import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import type { Category } from "common/types/category.types";

export function CategoryCard({ name, description }: Category) {
  return (
    <Card>
      <CardHeader>{name}</CardHeader>
      <CardContent>{description}</CardContent>
    </Card>
  );
}
