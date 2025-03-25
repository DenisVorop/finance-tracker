import { useBill } from "@/entities/bills";

export function BillPage() {
  const { data } = useBill();
  return (
    <div className="container my-4 lg:my-8">
      <div className="flex flex-col gap-4 lg:gap-6">
        {/*  */}
        {data?.name}
      </div>
    </div>
  );
}
