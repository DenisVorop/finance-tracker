import type { NextApiRequest } from "next/types";

import { prisma } from "common/lib/prisma";

import { CategoriesModel } from "./models/categories.model";

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
}
