import type { NextApiRequest } from "next/types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { prisma } from "common/lib/prisma";
import { categorySchema } from "common/schemas/category.schema";

import { CategoriesModel } from "./models/categories.model";
import { CategoryModel } from "./models/category.model";

export class CategoriesService {
  static async getCategories(req: NextApiRequest) {
    try {
      const user = req.__USER__;

      const dto = await prisma.category.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
      });

      return CategoriesModel.fromDTO(dto);
    } catch {
      return CategoriesModel.Error({
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async createCategory(req: NextApiRequest) {
    try {
      const user = req.__USER__;

      const data = await categorySchema.validate(req.body);

      const dto = await prisma.category.create({
        data: {
          ...data,
          userId: user.id,
        },
      });

      return CategoryModel.fromDTO(dto);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          return CategoryModel.Error({
            code: 400,
            message: "Такая категория уже существует",
          });
        }
      }

      return CategoryModel.Error({
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async deleteCategory(req: NextApiRequest) {
    try {
      const user = req.__USER__;
      const id = Number(req.query.id);

      const category = await prisma.category.findUnique({
        where: { id, userId: user.id },
      });

      if (!category) {
        return CategoryModel.Empty();
      }

      await prisma.category.delete({ where: { id: category.id } });

      return CategoryModel.fromDTO(category);
    } catch {
      return CategoryModel.Error({
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  static async updateCategory(req: NextApiRequest) {
    try {
      const user = req.__USER__;
      const id = Number(req.query.id);

      const category = await prisma.category.findUnique({
        where: { id, userId: user.id },
      });

      if (!category) {
        return CategoryModel.Empty();
      }

      const data = await categorySchema.validate(req.body);

      const updatedCategory = await prisma.category.update({
        where: { id: category.id },
        data,
      });

      return CategoryModel.fromDTO(updatedCategory);
    } catch {
      return CategoryModel.Error({
        code: 500,
        message: "Internal Server Error",
      });
    }
  }
}
