import { useCategories } from "@/entities/categories";

import { AddCategoryCard } from "../add-category-card";

export function CategoriesList() {
  const { flatItems, isEmpty } = useCategories();
  return (
    <>
      {isEmpty ? (
        <div className="flex flex-col gap-4 w-fit">
          <div className="title-secondary">категорий нет</div>
          <AddCategoryCard as="button" />
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
          {flatItems.map((category) => {
            return <div key={category.id}>{category.name}</div>;
          })}

          <AddCategoryCard />
        </div>
      )}
    </>
  );
}
