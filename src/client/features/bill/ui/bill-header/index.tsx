import { useBill } from "@/entities/bills";
import { PageHeader } from "@/shared/ui/page-header";

export function BillHeader() {
  const bill = useBill();

  return <PageHeader title={`${bill?.emoji} ${bill?.name}`} />;
}
