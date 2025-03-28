import { Trash } from "lucide-react";
import { useCallback } from "react";

import { Button } from "@/shared/ui/button";
import { useBill, useDeleteBill, useUpdateBill } from "@/entities/bills";
import { navigate } from "@/shared/lib/navigate";
import type { BillFormData } from "common/schemas/bill.schema";

import { useBillForm } from "../../providers/bill-form.provider";

export function BillActions() {
  const { updateBill, isPending: isUpdatePending } = useUpdateBill();
  const { deleteBill, isPending: isDeletePending } = useDeleteBill({
    onSuccess: () => {
      navigate({ href: "/bills" });
    },
  });
  const {
    methods: {
      handleSubmit,
      reset,
      formState: { isDirty },
    },
  } = useBillForm();
  const bill = useBill();

  const handleRemoveBill = useCallback(async () => {
    const confirm = window.confirm("Вы уверены, что хотите удалить счет?");

    if (!confirm) return;

    await deleteBill(bill.id);
  }, [bill.id, deleteBill]);

  const handleUpdateBill = useCallback(
    async (data: BillFormData) => {
      const updatedBill = await updateBill(bill.id, data);

      if (!updatedBill) return;

      reset(updatedBill);
    },
    [bill.id, reset, updateBill]
  );

  return (
    <div className="flex gap-4">
      <Button
        variant="default"
        disabled={!isDirty}
        isLoading={isUpdatePending}
        onClick={handleSubmit(handleUpdateBill)}
      >
        Сохранить
      </Button>

      <Button
        variant="destructive"
        onClick={handleRemoveBill}
        isLoading={isDeletePending}
      >
        <Trash />
      </Button>
    </div>
  );
}
