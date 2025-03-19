import type { BillType } from "common/types/bill.types";

export const billTypesMap: Record<BillType, string> = {
  DEBT_LEND: "Долговой; мне должны",
  DEBT_OWE: "Долговой; я должен",
  REGULAR: "Обычный",
  SAVINGS: "Накопительный",
};
