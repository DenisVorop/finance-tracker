import { Label } from "@/shared/ui/label";
import { Button } from "@/shared/ui/button";
import { useResponsiveModal } from "@/shared/hooks/use-responsive-modal";
import { useCreateBill } from "@/entities/bills";
import { FormControl } from "@/shared/ui/form-control";

import { useBillForm } from "../../providers/bill-form.provider";

export function AddBillForm() {
  const { methods, toggle } = useBillForm();

  const { ModalHeader, ModalTitle, ModalContent, ModalClose } =
    useResponsiveModal();

  const { createBill, isPending } = useCreateBill({
    onSuccess: () => {
      toggle();
    },
  });

  return (
    <ModalContent side="bottom">
      <ModalHeader>
        <ModalTitle>Создание нового счёта</ModalTitle>
      </ModalHeader>

      <form
        onSubmit={methods.handleSubmit(createBill)}
        className="flex flex-col gap-4 mt-4"
      >
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Название счёта */}
          <FormControl
            controlLabel="Название счета"
            name="name"
            controlType="text"
            control={methods.control}
            errorMessage={methods.formState.errors.name?.message}
          />

          {/* Тип счёта */}
          <FormControl
            controlLabel="Тип счета"
            name="type"
            controlType="bill-type"
            control={methods.control}
            errorMessage={methods.formState.errors.type?.message}
          />

          {/* Цвет фона */}
          <div>
            <Label>Цвет фона</Label>
            <div className="grid grid-cols-5 gap-2">
              {["#2ed861", "#ce2e2e", "#1d65c4", "#ca7d1e", "#8ab723"].map(
                (color) => (
                  <Button
                    key={color}
                    variant={
                      methods.watch("backgroundColor") === color
                        ? "secondary"
                        : "ghost"
                    }
                    type="button"
                    className="p-1"
                    onClick={() => methods.setValue("backgroundColor", color)}
                  >
                    <div
                      className="w-full h-full rounded-sm"
                      style={{ backgroundColor: color }}
                    />
                  </Button>
                )
              )}
            </div>
          </div>

          {/* Эмодзи */}
          <div>
            <Label>Эмодзи</Label>
            <div className="grid grid-cols-5 gap-2">
              {["💰", "📈", "🏦", "💹", "💵"].map((emoji) => (
                <Button
                  key={emoji}
                  variant={
                    methods.watch("emoji") === emoji ? "secondary" : "ghost"
                  }
                  type="button"
                  onClick={() => methods.setValue("emoji", emoji)}
                >
                  {emoji}
                </Button>
              ))}
            </div>
            {methods.formState.errors.emoji && (
              <p className="text-red-500 text-sm">
                {methods.formState.errors.emoji.message}
              </p>
            )}
          </div>
        </div>

        {/* Описание счёта */}
        <FormControl
          controlLabel="Описание счёта"
          name="description"
          controlType="textarea"
          control={methods.control}
          placeholder="Основной счёт для повседневных операций"
          errorMessage={methods.formState.errors.description?.message}
        />

        {/* Баланс */}
        <FormControl
          controlLabel="Баланс"
          name="balance"
          controlType="text"
          type="number"
          control={methods.control}
          placeholder="10500"
          errorMessage={methods.formState.errors.balance?.message}
        />

        {/* Учитывать в общем балансе */}
        <FormControl
          label="Учитывать счёт в общем балансе"
          name="includeInTotal"
          controlType="switch"
          control={methods.control}
          errorMessage={methods.formState.errors.includeInTotal?.message}
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
