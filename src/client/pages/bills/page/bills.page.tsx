import { BillsHeader, BillsList } from "@/features/bills";

export function BillsPage() {
  return (
    <div className="container my-4 lg:my-8">
      <div className="flex flex-col gap-4 lg:gap-6">
        <BillsHeader />

        <BillsList />
      </div>
    </div>
  );
}
