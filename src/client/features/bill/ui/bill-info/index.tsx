import { FormControl } from "@/shared/ui/form-control";

import { useBillForm } from "../../providers/bill-form.provider";

export function BillInfo() {
  const {
    methods: {
      control,
      formState: { errors },
    },
  } = useBillForm();

  return (
    <div className="flex flex-col gap-4">
      <FormControl
        controlLabel="Описание счета"
        name="description"
        controlType="textarea"
        control={control}
        className="max-h-32 h-32"
        errorMessage={errors.description?.message}
      />

      <div className="grid md:grid-cols-2 gap-4">
        <FormControl
          controlLabel="Тип счёта"
          name="type"
          controlType="bill-type"
          control={control}
          errorMessage={errors.type?.message}
        />

        <FormControl
          controlLabel="Баланс"
          name="balance"
          controlType="text"
          type="number"
          control={control}
          errorMessage={errors.balance?.message}
        />

        <div />

        <FormControl
          label="Учитывать счёт в общем балансе"
          name="includeInTotal"
          controlType="switch"
          control={control}
          errorMessage={errors.includeInTotal?.message}
        />
      </div>
    </div>
  );
}
