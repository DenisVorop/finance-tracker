import type { Operation as PrismaOperation } from "@prisma/client";
import { OperationType as PrismaOperationType } from "@prisma/client";

import type { Bill, DataBaseBill } from "./bill.types";

export type OperationType = PrismaOperationType;
export const OperationType = PrismaOperationType;

export type DataBaseOperation = PrismaOperation & { bill: DataBaseBill };
export type Operation = Omit<PrismaOperation, "amount"> & {
  amount: number;
  bill: Bill;
};

export interface OperationsDto {
  data: Operation[];
}
