import { BillType } from "common/types/bill.types";

export const billTypesMap: Record<BillType, string> = {
  [BillType.DEBT_LEND]: "Долговой; мне должны",
  [BillType.DEBT_OWE]: "Долговой; я должен",
  [BillType.REGULAR]: "Обычный",
  [BillType.SAVINGS]: "Накопительный",
};
