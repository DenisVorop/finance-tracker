import { hexToRgb } from "@/shared/lib/hex-to-rgb";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import type { Bill } from "common/types/bill.types";

import { billTypesMap } from "../lib/bill-types-map";

export function BillCard({
  backgroundColor,
  name,
  emoji,
  type,
  balance,
}: Bill) {
  const { r, g, b } = hexToRgb(backgroundColor);
  return (
    <Card style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.2)` }}>
      <CardHeader className="flex items-center justify-between gap-4 flex-row">
        <div className="text font-medium">{name}</div>
        <div>{emoji}</div>
      </CardHeader>

      <CardContent>
        <div className="text-secondary">{billTypesMap[type]}</div>
        <div className="title-secondary" style={{ color: backgroundColor }}>
          {new Intl.NumberFormat("ru-RU", {
            style: "currency",
            currency: "RUB",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }).format(balance)}
        </div>
      </CardContent>
    </Card>
  );
}
