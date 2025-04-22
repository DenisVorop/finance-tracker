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
        billId: bill?.id,
        date: new Date(),
        type: OperationType.WITHDRAWAL,
      });
    },
    [bill?.id, methods, setInitialData, toggle, user?.id]
  );

  return (
    <Modal open={openModal} onOpenChange={onOpenChange}>
      <ModalTrigger className="w-fit">
        <span className="button-primary">Добавить операцию</span>
      </ModalTrigger>

      <AddOperationForm />
    </Modal>
  );
}

export const AddOperationTrigger = withOperationsProviders(
  AddOperationTriggerBase
);
