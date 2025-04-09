import { useCallback } from "react";

import { useCategories, CategoryCard } from "@/entities/categories";
import { useResponsiveModal } from "@/shared/hooks/use-responsive-modal";

import { UpdateCategoryForm } from "../update-category-form";
import { withCategoryProviders } from "../../providers/with-category-providers";
import { useCategoryForm } from "../../providers/category-form.provider";

function BaseCategoriesList() {
  const { flatItems } = useCategories();
  const { Modal, ModalTrigger } = useResponsiveModal();
  const { setInitialData, openModal, toggle, methods } = useCategoryForm();

  const onOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        methods.reset();
      }

      toggle();
    },
    [methods, toggle]
  );

  return (
    <Modal open={openModal} onOpenChange={onOpenChange}>
      {flatItems.map((category) => {
        return (
          <ModalTrigger
            key={category.id}
            onClick={() => setInitialData(category)}
          >
            <CategoryCard {...category} />
          </ModalTrigger>
        );
      })}

      <UpdateCategoryForm />
    </Modal>
  );
}

export const CategoriesListCards = withCategoryProviders(BaseCategoriesList);
