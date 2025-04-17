import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";

import { useOperations } from "../model/operations.model";

import { OperationRow } from "./operation-row";

export function OperationsList({ billId }: { billId?: number }) {
  const {
    flatItems,
    isFetchingNextPage,
    isSsrEmpty,
    hasNextPage,
    take,
    isPending,
    fetchNextPage,
  } = useOperations({ billId });

  return (
    <div className="flex flex-col gap-4">
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
          {isPending ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell colSpan={5}>
                  <Skeleton className="h-[23px] w-full rounded-md" />
                </TableCell>
              </TableRow>
            ))
          ) : isSsrEmpty ? (
            <TableRow>
              <TableCell colSpan={5}>Нет операций</TableCell>
            </TableRow>
          ) : (
            flatItems.map((operation) => {
              return <OperationRow key={operation.id} {...operation} />;
            })
          )}
        </TableBody>
      </Table>

      {hasNextPage && (
        <Button
          className="w-full"
          isLoading={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          Загрузить ещё {take}
        </Button>
      )}
    </div>
  );
}
