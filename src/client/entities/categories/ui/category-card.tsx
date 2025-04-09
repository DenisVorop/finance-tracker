import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import type { Category } from "common/types/category.types";

export function CategoryCard({ name, description }: Category) {
  return (
    <Card className="hover:border-primary transition-colors">
      <CardHeader className="items-start">{name}</CardHeader>
      <CardContent className="text-start">{description}</CardContent>
    </Card>
  );
}
