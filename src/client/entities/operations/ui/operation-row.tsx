import { exhaustiveCheck } from "@/shared/lib/exhaustive-check";
import { formatCurrency } from "@/shared/lib/format-number";
import { cn } from "@/shared/lib/utils";
import { TableCell, TableRow } from "@/shared/ui/table";
import { OperationType, type Operation } from "common/types/operations.types";

export function OperationRow({
  date,
  category,
  note,
  amount,
  bill,
  type,
}: Operation) {
  const operationType = _getOperationType(type);

  return (
    <TableRow>
      <TableCell className="font-medium">
        {new Date(date).toLocaleDateString()}
      </TableCell>
      <TableCell>{bill?.name || " - "}</TableCell>
      <TableCell>{category}</TableCell>
      <TableCell>{note}</TableCell>
      <TableCell
        className={cn("text-right", {
          "text-green-600": type === OperationType.DEPOSIT,
          "text-red-600": type === OperationType.WITHDRAWAL,
        })}
      >
        {operationType} {formatCurrency(amount)}
      </TableCell>
    </TableRow>
  );
}

function _getOperationType(type: OperationType) {
  switch (type) {
    case OperationType.DEPOSIT:
      return "+";
    case OperationType.WITHDRAWAL:
      return "-";
    default:
      exhaustiveCheck(type);
  }
}
