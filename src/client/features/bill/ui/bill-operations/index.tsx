import { OperationsList } from "@/entities/operations";
import { AddOperationTrigger } from "@/features/operations";

export function BillOperations() {
  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <div className="flex gap-4 items-center">
        <div className="title-secondary">Операции</div>

        <AddOperationTrigger />
      </div>

      <OperationsList />
    </div>
  );
}
