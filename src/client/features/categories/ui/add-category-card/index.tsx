import { useCallback } from "react";

import { useResponsiveModal } from "@/shared/hooks/use-responsive-modal";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { cn } from "@/shared/lib/utils";

import { AddCategoryForm } from "../add-category-form";
import { withCategoryProviders } from "../../providers/with-category-providers";
import { useCategoryForm } from "../../providers/category-form.provider";

interface ButtonProps {
  as: "button";
  className?: string;
}

function isButton(rest: { as?: "button" | "card" }): rest is ButtonProps {
  return rest.as === "button";
}

function AddCategoryCardBase<T extends "button" | "card">({
  ...rest
}: T extends "button"
  ? { as?: "button"; className?: string }
  : { as?: "card" }) {
  const { Modal, ModalTrigger } = useResponsiveModal();
  const { methods, openModal, toggle } = useCategoryForm();

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
      <ModalTrigger>
        {isButton(rest) ? (
          <div
            {...rest}
            className={cn(rest.className, "button-primary w-full")}
          >
            Добавить
          </div>
        ) : (
          <Card className="hover:border-primary cursor-pointer transition-colors animate-pulse">
            <CardHeader className="flex items-center justify-between gap-4 flex-row">
              <div className="text font-medium">Новая категория</div>
            </CardHeader>

            <CardContent>
              <div className="text-secondary text-left">Добавить категорию</div>
            </CardContent>
          </Card>
        )}
      </ModalTrigger>

      <AddCategoryForm />
    </Modal>
  );
}

export const AddCategoryCard = withCategoryProviders(AddCategoryCardBase);
