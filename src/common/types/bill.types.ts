import type { Bill as PrismaBill } from "@prisma/client";
import { BillType as PrismaBillType } from "@prisma/client";

/**
 * - `DEBT_LEND` - Долговой; мне должны
 * - `DEBT_OWE` - Долговой; я должен
 * - `REGULAR` - Обычный
 * - `SAVINGS` - Накопительный
 */
export const BillType = PrismaBillType;
export type BillType = PrismaBillType;

export type DataBaseBill = PrismaBill;
export type Bill = Omit<PrismaBill, "balance"> & { balance: number };

export interface BillsDto {
  data: Bill[];
}
