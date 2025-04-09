import { useCategoriesSummary } from "@/entities/reports";
import { formatCurrency } from "@/shared/lib/format-number";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { exhaustiveCheck } from "common/lib/exhaustive-check";
import { OperationType } from "common/types/operations.types";

export function CategoriesSummary() {
  const { data } = useCategoriesSummary();

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
      {data?.map((category) => {
        const { label, color } = _getCategoryParamsByType(category.type);

        return (
          <Card key={category.name}>
            <CardHeader>{category.name}</CardHeader>
            <CardContent>
              <div className="flex items-center justify-between gap-2">
                <span>Сумма</span>
                <span className={color}>{formatCurrency(category.amount)}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span>От общего {label}</span>
                <span className={color}>{category.percent}%</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function _getCategoryParamsByType(type: OperationType) {
  switch (type) {
    case OperationType.DEPOSIT:
      return { label: "дохода", color: "text-green-500" };
    case OperationType.WITHDRAWAL:
      return { label: "расхода", color: "text-red-500" };
    default:
      exhaustiveCheck(type);
  }
}
