import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Button } from "@/shared/ui/button";

import { useOperations } from "../model/operations.model";

import { OperationRow } from "./operation-row";

export function OperationsList({ billId }: { billId?: number }) {
  const { flatItems, isLoading, isSsrEmpty, hasNextPage, take, fetchNextPage } =
    useOperations({ billId });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-32">Дата</TableHead>
          <TableHead>Счёт</TableHead>
          <TableHead>Категория</TableHead>
          <TableHead>Комментарий</TableHead>
          <TableHead className="text-right">Сумма</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isSsrEmpty ? (
          <TableRow>
            <TableCell colSpan={5}>Нет операций</TableCell>
          </TableRow>
        ) : (
          flatItems.map((operation) => {
            return <OperationRow key={operation.id} {...operation} />;
          })
        )}

        {hasNextPage && (
          <TableRow>
            <TableCell colSpan={5}>
              <Button
                className="w-full"
                isLoading={isLoading}
                onClick={() => fetchNextPage()}
              >
                Загрузить ещё {take}
              </Button>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
