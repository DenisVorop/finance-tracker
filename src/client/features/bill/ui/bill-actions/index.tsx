import { Trash } from "lucide-react";
import { useCallback } from "react";

import { Button } from "@/shared/ui/button";
import { useBill, useDeleteBill } from "@/entities/bills";
import { navigate } from "@/shared/lib/navigate";

import { useBillForm } from "../../providers/bill-form.provider";

export function BillActions() {
  const { deleteBill, isPending } = useDeleteBill({
    onSuccess: () => {
      navigate({ href: "/bills" });
    },
  });
  const {
    methods: {
      formState: { isDirty },
    },
  } = useBillForm();
  const bill = useBill();

  const handleRemoveBill = useCallback(async () => {
    const confirm = window.confirm("Вы уверены, что хотите удалить счет?");

    if (!confirm) return;

    await deleteBill(bill.id);
  }, [bill.id, deleteBill]);

  return (
    <div className="flex gap-4">
      <Button variant="default" disabled={!isDirty}>
        Сохранить
      </Button>

      <Button
        variant="destructive"
        onClick={handleRemoveBill}
        isLoading={isPending}
      >
        <Trash />
      </Button>
    </div>
  );
}
