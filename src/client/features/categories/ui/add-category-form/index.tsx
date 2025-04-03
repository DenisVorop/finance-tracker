import { Button } from "@/shared/ui/button";
import { useResponsiveModal } from "@/shared/hooks/use-responsive-modal";
import { FormControl } from "@/shared/ui/form-control";
import { useCreateCategory } from "@/entities/categories";

import { useCategoryForm } from "../../providers/category-form.provider";

export function AddCategoryForm() {
  const { methods, toggle } = useCategoryForm();

  const { ModalHeader, ModalTitle, ModalContent, ModalClose } =
    useResponsiveModal();

  const { createCategory, isPending } = useCreateCategory({
    onSuccess: () => {
      toggle();
    },
  });

  return (
    <ModalContent side="bottom">
      <ModalHeader>
        <ModalTitle>Создание новой категории</ModalTitle>
      </ModalHeader>

      <form
        onSubmit={methods.handleSubmit(createCategory)}
        className="flex flex-col gap-4 mt-4"
      >
        <div className="flex flex-col gap-4">
          {/* Название категории */}
          <FormControl
            controlLabel="Название категории"
            controlType="text"
            name="name"
            control={methods.control}
            placeholder="Подарки"
          />

          {/* Описание */}
          <FormControl
            controlLabel="Описание"
            controlType="textarea"
            name="description"
            control={methods.control}
            placeholder="От сюрпризов до крупных подарков на праздники"
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
