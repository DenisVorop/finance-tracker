import { BillType as PrismaBillType } from "@prisma/client";

/**
 * - `DEBT_LEND` - Долговой; мне должны
 * - `DEBT_OWE` - Долговой; я должен
 * - `REGULAR` - Обычный
 * - `SAVINGS` - Накопительный
 */
export const BillType = PrismaBillType;
export type BillType = PrismaBillType;
