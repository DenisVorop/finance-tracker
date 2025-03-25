import Link from "next/link";

import { BillCard, useBills } from "@/entities/bills";

import { AddBillCard } from "../add-bill-card";

export function BillsList() {
  const { data } = useBills();
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
      {data?.data.map((bill) => {
        return (
          <Link key={bill.id} href={`/bills/${bill.id}`}>
            <BillCard
              {...bill}
              className="hover:border-primary transition-colors"
            />
          </Link>
        );
      })}

      <AddBillCard />
    </div>
  );
}
