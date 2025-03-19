import { BillCard, useBills } from "@/entities/bills";

export function BillsList() {
  const { data } = useBills();
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
      {data?.data.map((bill) => {
        return <BillCard key={bill.id} {...bill} />;
      })}
    </div>
  );
}
