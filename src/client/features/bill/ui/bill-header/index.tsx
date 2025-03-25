import { useBill } from "@/entities/bills";

export function BillHeader() {
  const bill = useBill();

  return (
    <div className="flex justify-between flex-col gap-4 lg:gap-6 lg:flex-row lg:items-center">
      <div className="title">
        {bill.emoji} {bill.name}
      </div>
    </div>
  );
}
