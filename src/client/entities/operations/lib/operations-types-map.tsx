import { OperationType } from "common/types/operations.types";

export const operationTypesMap: Record<OperationType, string> = {
  [OperationType.DEPOSIT]: "Доход",
  [OperationType.WITHDRAWAL]: "Расход",
};
