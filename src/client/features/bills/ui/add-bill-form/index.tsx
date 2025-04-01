import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Button } from "@/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Switch } from "@/shared/ui/switch";
import { Textarea } from "@/shared/ui/textarea";
import { useResponsiveModal } from "@/shared/hooks/use-responsive-modal";
import { BillType } from "common/types/bill.types";
import { billTypesMap, useCreateBill } from "@/entities/bills";
import type { BillFormData } from "common/schemas/bill.schema";

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
          <div>
            <Label htmlFor="name">Название счёта</Label>
            <Input
              id="name"
              {...methods.register("name")}
              placeholder="Основной счёт"
            />
            {methods.formState.errors.name && (
              <p className="text-red-500 text-sm">
                {methods.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* Тип счёта */}
          <div>
            <Label>Тип счёта</Label>
            <Select
              onValueChange={(value) =>
                methods.setValue("type", value as BillFormData["type"])
              }
              defaultValue={methods.getValues("type")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип счёта" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(BillType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {billTypesMap[type]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {methods.formState.errors.type && (
              <p className="text-red-500 text-sm">
                {methods.formState.errors.type.message}
              </p>
            )}
          </div>

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
        <div>
          <Label>Описание счёта</Label>
          <Textarea
            {...methods.register("description")}
            placeholder="Основной счёт для повседневных операций"
          />
        </div>

        {/* Баланс */}
        <div>
          <Label>Баланс</Label>
          <Input
            type="number"
            {...methods.register("balance")}
            placeholder="10500"
          />
          {methods.formState.errors.balance && (
            <p className="text-red-500 text-sm">
              {methods.formState.errors.balance.message}
            </p>
          )}
        </div>

        {/* Учитывать в общем балансе */}
        <div className="flex items-center justify-between">
          <Label>Учитывать счёт в общем балансе</Label>
          <Switch
            checked={methods.watch("includeInTotal")}
            onCheckedChange={(checked) =>
              methods.setValue("includeInTotal", checked)
            }
          />
        </div>

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
