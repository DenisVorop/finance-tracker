import { FormControl } from "@/shared/ui/form-control";

import { useBillForm } from "../../providers/bill-form.provider";

export function BillInfo() {
  const {
    methods: { control },
  } = useBillForm();

  return (
    <div className="flex flex-col gap-4">
      <FormControl
        controlLabel="Описание счета"
        name="description"
        controlType="textarea"
        control={control}
        className="max-h-32 h-32"
      />

      <div className="grid md:grid-cols-2 gap-4">
        <FormControl
          controlLabel="Тип счёта"
          name="type"
          controlType="bill-type"
          control={control}
        />

        <FormControl
          controlLabel="Баланс"
          name="balance"
          controlType="text"
          type="number"
          control={control}
        />

        <div />

        <FormControl
          label="Учитывать счёт в общем балансе"
          name="includeInTotal"
          controlType="switch"
          control={control}
        />
      </div>
    </div>
  );
}
