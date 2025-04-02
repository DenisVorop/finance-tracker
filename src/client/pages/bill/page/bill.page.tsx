import {
  BillActions,
  BillHeader,
  BillInfo,
  BillOperations,
  withBillProviders,
} from "@/features/bill";
import { Separator } from "@/shared/ui/separator";

function Page() {
  return (
    <>
      <BillHeader />

      <Separator />

      <BillInfo />

      <Separator />

      <BillActions />

      <Separator />

      <BillOperations />
    </>
  );
}

export const BillPage = withBillProviders(Page);
