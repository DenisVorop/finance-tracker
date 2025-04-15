import { hexToRgb } from "@/shared/lib/hex-to-rgb";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import type { Bill } from "common/types/bill.types";
import { formatCurrency } from "@/shared/lib/format-number";

import { billTypesMap } from "../lib/bill-types-map";

export function BillCard({
  backgroundColor,
  name,
  emoji,
  type,
  balance,
  className,
}: Bill & { className?: string }) {
  const { r, g, b } = hexToRgb(backgroundColor);
  const formattedBalance = formatCurrency(balance);

  return (
    <Card
      style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.2)` }}
      className={className}
    >
      <CardHeader className="flex items-center justify-between gap-4 flex-row">
        <div className="text font-medium truncate" title={name}>
          {name}
        </div>
        <div>{emoji}</div>
      </CardHeader>

      <CardContent>
        <div className="text-secondary">{billTypesMap[type]}</div>
        <div
          className="title-secondary truncate"
          style={{ color: backgroundColor }}
          title={formattedBalance}
        >
          {formattedBalance}
        </div>
      </CardContent>
    </Card>
  );
}
