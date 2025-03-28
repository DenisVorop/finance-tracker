import {
  BillActions,
  BillHeader,
  BillInfo,
  withBillProviders,
} from "@/features/bill";
import { Separator } from "@/shared/ui/separator";

function Page() {
  return (
    <div className="container my-4 lg:my-8">
      <div className="flex flex-col gap-4 lg:gap-6">
        <BillHeader />

        <Separator />

        <BillInfo />

        <Separator />

        <BillActions />

        <Separator />
      </div>
    </div>
  );
}

export const BillPage = withBillProviders(Page);
