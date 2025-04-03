import type { Operation as PrismaOperation } from "@prisma/client";
import { OperationType as PrismaOperationType } from "@prisma/client";

import type { Bill, DataBaseBill } from "./bill.types";
import type { Category } from "./category.types";

export type OperationType = PrismaOperationType;
export const OperationType = PrismaOperationType;

export type DataBaseOperation = PrismaOperation & {
  bill: DataBaseBill;
  category: Category | null;
};
export type Operation = Omit<PrismaOperation, "amount"> & {
  amount: number;
  bill: Bill;
  category: Category | null;
};

export interface OperationsDto {
  data: Operation[];
  params: {
    page: number;
    pageSize: number;
  };
  total: number;
  totalPages: number;
}
