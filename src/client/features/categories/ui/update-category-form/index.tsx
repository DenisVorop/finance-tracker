import { useCallback } from "react";
import { Trash } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { useResponsiveModal } from "@/shared/hooks/use-responsive-modal";
import { FormControl } from "@/shared/ui/form-control";
import { useDeleteCategory, useUpdateCategory } from "@/entities/categories";
import type { CategoryFormData } from "common/schemas/category.schema";

import { useCategoryForm } from "../../providers/category-form.provider";

export function UpdateCategoryForm() {
  const { methods, toggle } = useCategoryForm();

  const name = methods.getValues("name");
  const id = methods.getValues("id");

  const { ModalHeader, ModalTitle, ModalContent, ModalClose } =
    useResponsiveModal();

  const { updateCategory, isPending } = useUpdateCategory({
    onSuccess: () => {
      toggle();
    },
  });

  const { deleteCategory, isPending: isPendingDelete } = useDeleteCategory({
    onSuccess: () => {
      toggle();
    },
  });

  const handleUpdateCategory = useCallback(
    (data: CategoryFormData) => {
      if (!id) return;

      updateCategory({ id, data });
    },
    [id, updateCategory]
  );

  const handleDeleteCategory = useCallback(() => {
    if (!id) return;

    const isConfirmed = confirm("Вы уверены, что хотите удалить категорию?");
    if (!isConfirmed) return;

    deleteCategory(id);
  }, [deleteCategory, id]);

  return (
    <ModalContent side="bottom">
      <ModalHeader>
        <ModalTitle>Обновление категории - {name}</ModalTitle>
      </ModalHeader>

      <form
        onSubmit={methods.handleSubmit(handleUpdateCategory)}
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
          {id && (
            <Button
              type="reset"
              isLoading={isPendingDelete}
              onClick={handleDeleteCategory}
              className="bg-red-600 hover:bg-red-700 text-white transition-colors mr-auto"
            >
              <Trash />
            </Button>
          )}
          <ModalClose>
            <Button type="button" variant="outline">
              Отменить
            </Button>
          </ModalClose>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Обновляем..." : "Обновить"}
          </Button>
        </div>
      </form>
    </ModalContent>
  );
}
