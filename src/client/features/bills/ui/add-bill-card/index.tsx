"use client";

import { useResponsiveModal } from "@/shared/hooks/use-responsive-modal";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

import { AddBillForm } from "../add-bill-form";
import { withBillProviders } from "../../providers/with-gallery-providers";
import { useBillForm } from "../../providers/bill-form.provider";

function AddBillCardBase() {
  const { Modal, ModalTrigger } = useResponsiveModal();
  const { methods } = useBillForm();

  return (
    <Modal
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          methods.reset();
        }
      }}
    >
      <ModalTrigger>
        <Card className="hover:border-primary cursor-pointer transition-colors animate-pulse">
          <CardHeader className="flex items-center justify-between gap-4 flex-row">
            <div className="text font-medium">Добавить счет</div>
          </CardHeader>

          <CardContent>
            <div className="text-secondary text-left">Тип счета</div>
            <Skeleton className="h-9 w-full rounded-md" />
          </CardContent>
        </Card>
      </ModalTrigger>

      <AddBillForm />
    </Modal>
  );
}

export const AddBillCard = withBillProviders(AddBillCardBase);
