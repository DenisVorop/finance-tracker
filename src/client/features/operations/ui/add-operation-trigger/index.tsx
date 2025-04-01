import { useCallback } from "react";

import { useResponsiveModal } from "@/shared/hooks/use-responsive-modal";
import { useAuth } from "@/entities/auth";
import { useBill } from "@/entities/bills";
import { OperationType } from "common/types/operations.types";

import { AddOperationForm } from "../add-operation-form";
import { withOperationsProviders } from "../../providers/with-operations-providers";
import { useOperationsForm } from "../../providers/operations-form.provider";

function AddOperationTriggerBase() {
  const { Modal, ModalTrigger } = useResponsiveModal();
  const { methods, openModal, toggle, setInitialData } = useOperationsForm();

  const [user] = useAuth();
  const bill = useBill();

  const onOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        methods.reset();
      }

      toggle();
      setInitialData({
        userId: user?.id,
        billId: bill.id,
        date: new Date(),
        type: OperationType.WITHDRAWAL,
      });
    },
    [bill.id, methods, setInitialData, toggle, user?.id]
  );

  return (
    <Modal open={openModal} onOpenChange={onOpenChange}>
      <ModalTrigger className="w-fit">
        <span className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
          Добавить операцию
        </span>
      </ModalTrigger>

      <AddOperationForm />
    </Modal>
  );
}

export const AddOperationTrigger = withOperationsProviders(
  AddOperationTriggerBase
);
