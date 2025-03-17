import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { signUpSchema } from "$/signup.schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      return await POST(req, res);
    default:
      return res.status(405).json({ error: "Метод не разрешён" });
  }
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password } = await signUpSchema.validate(req.body);

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Пользователь уже существует" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return res
      .status(201)
      .json({ message: "Пользователь создан", user: newUser });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err });
    }
    return res.status(500);
  }
}
