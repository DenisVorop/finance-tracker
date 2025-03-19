import { useBills } from "@/entities/bills";
import { cn } from "@/shared/lib/utils";

export function BillsHeader() {
  const { totalAmount } = useBills();

  const totalAmountColor =
    (totalAmount || 0) < 0 ? "text-red-500" : "text-green-500";

  return (
    <div className="flex justify-between flex-col gap-4 lg:gap-6 lg:flex-row lg:items-center">
      <div className="title">Счета</div>

      <div className="flex flex-col-reverse lg:items-baseline lg:gap-3 lg:flex-row">
        <span className="text-secondary">Общая сумма всех счётов</span>
        <span className="title-secondary lg:title">
          <span className={cn(totalAmountColor)}>
            {new Intl.NumberFormat("ru-RU", {
              style: "currency",
              currency: "RUB",
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            }).format(totalAmount)}
          </span>
        </span>
      </div>
    </div>
  );
}
