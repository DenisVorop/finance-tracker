import { Trash } from "lucide-react";
import { useCallback } from "react";

import { Button } from "@/shared/ui/button";

import { useBillForm } from "../../providers/bill-form.provider";

export function BillActions() {
  const {
    methods: {
      formState: { isDirty },
    },
  } = useBillForm();

  const handleRemoveBill = useCallback(() => {
    const confirm = window.confirm("Вы уверены, что хотите удалить счет?");

    if (!confirm) return;

    console.log("Удален");
  }, []);

  return (
    <div className="flex gap-4">
      <Button variant="default" disabled={!isDirty}>
        Сохранить
      </Button>

      <Button variant="destructive" onClick={handleRemoveBill}>
        <Trash />
      </Button>
    </div>
  );
}
