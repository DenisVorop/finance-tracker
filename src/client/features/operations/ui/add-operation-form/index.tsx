import { useCallback } from "react";

import { Button } from "@/shared/ui/button";
import { useResponsiveModal } from "@/shared/hooks/use-responsive-modal";
import { useCreateOperation } from "@/entities/operations";
import { FormControl } from "@/shared/ui/form-control";
import type { OperationFormData } from "common/schemas/operation.schema";
import { useSetBill } from "@/entities/bills";

import { useOperationsForm } from "../../providers/operations-form.provider";

export function AddOperationForm() {
  const { methods, toggle } = useOperationsForm();
  const setBill = useSetBill();

  const { ModalHeader, ModalTitle, ModalContent, ModalClose } =
    useResponsiveModal();

  const { createOperation, isPending } = useCreateOperation({
    onSuccess: (data) => {
      toggle();
      setBill(data.bill);
    },
  });

  const handleCreateOperation = useCallback(
    (data: OperationFormData) => {
      createOperation(data);
    },
    [createOperation]
  );

  return (
    <ModalContent side="bottom">
      <ModalHeader>
        <ModalTitle>Новая операция</ModalTitle>
      </ModalHeader>

      <form
        onSubmit={methods.handleSubmit(handleCreateOperation)}
        className="flex flex-col gap-4 mt-4"
      >
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Выберите счёт */}
          <FormControl
            controlType="bills"
            control={methods.control}
            name="billId"
            controlLabel="Выберите счёт"
          />

          {/* Категория */}
          <FormControl
            controlLabel="Тип операции"
            name="type"
            control={methods.control}
            controlType="operation-type"
          />

          {/* Сумма */}
          <FormControl
            controlLabel="Сумма"
            name="amount"
            control={methods.control}
            controlType="text"
            type="number"
            placeholder="500 ₽"
          />

          {/* Дата */}
          <FormControl
            controlType="date-picker"
            control={methods.control}
            name="date"
            controlLabel="Дата"
            placeholder="Выберите дату"
          />

          {/* Комментарий */}
          <div className="col-span-2">
            <FormControl
              controlLabel="Комментарий"
              name="note"
              controlType="textarea"
              control={methods.control}
              placeholder="Оплата обеда"
            />
          </div>
        </div>

        {/* TODO: Добавить категории! */}
        <input
          type="hidden"
          value={"category"}
          {...methods.register("category")}
        />

        {/* Кнопки */}
        <div className="flex justify-end gap-2">
          <ModalClose>
            <Button type="button" variant="outline">
              Отменить
            </Button>
          </ModalClose>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Создание..." : "Создать"}
          </Button>
        </div>
      </form>
    </ModalContent>
  );
}
