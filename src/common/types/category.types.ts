import type { Category as PrismaCategory } from "@prisma/client";

export type Category = PrismaCategory;

export interface CategoriesDto {
  categories: Category[];
  _isEmpty: boolean;
  _isError: boolean;
}
