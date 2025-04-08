import { ReportsHeader } from "@/features/reports";
import { LineOperationsChart } from "@/entities/reports";

export function ReportsPage() {
  return (
    <>
      <ReportsHeader />

      <div className="flex gap-6 flex-col md:flex-row">
        <LineOperationsChart
          type="income"
          className="shadow-sm border-[1px] p-4 rounded-md bg-background"
        />
        <LineOperationsChart
          type="expense"
          className="shadow-sm border-[1px] p-4 rounded-md bg-background"
        />
      </div>
    </>
  );
}
