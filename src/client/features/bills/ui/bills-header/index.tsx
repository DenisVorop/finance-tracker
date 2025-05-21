import { useBills } from "@/entities/bills";
import { formatCurrency } from "@/shared/lib/format-number";
import { cn } from "@/shared/lib/utils";
import { PageHeader } from "@/shared/ui/page-header";

export function BillsHeader() {
  const { totalAmount } = useBills();

  const totalAmountColor =
    (totalAmount || 0) < 0 ? "text-red-500" : "text-green-500";

  return (
    <PageHeader title="Счета">
      <div className="flex flex-col-reverse lg:items-baseline lg:gap-3 lg:flex-row">
        <span className="text-secondary">Общая сумма всех счётов</span>
        <span className="title-secondary lg:title">
          <span className={cn(totalAmountColor)}>
            {formatCurrency(totalAmount)}
          </span>
        </span>
      </div>
    </PageHeader>
  );
}
