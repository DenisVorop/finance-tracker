import type { NextApiRequest } from "next/types";

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
    } catch {
      return CategoryModel.Error({
        code: 500,
        message: "Internal Server Error",
      });
    }
  }
}
