import { OperationsList } from "@/entities/operations";
import { AddOperationTrigger } from "@/features/operations";
import { PageHeader } from "@/shared/ui/page-header";

export function OperationsPage() {
  return (
    <>
      <PageHeader title="Все операции">
        <AddOperationTrigger />
      </PageHeader>

      <OperationsList />
    </>
  );
}
