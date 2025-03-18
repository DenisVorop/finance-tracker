import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

import { prisma } from "@/lib/prisma";
import type { SignInResponse } from "@/api/auth";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXPIRY = parseFloat(process.env.REFRESH_TOKEN_EXPIRY);
const ACCESS_TOKEN_EXPIRY = parseFloat(process.env.ACCESS_TOKEN_EXPIRY);

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
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Неверный email или пароль" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Неверный email или пароль" });
    }

    // 1. Создаём сессию без `refreshToken`
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        expiresAt: new Date(Date.now() + ACCESS_TOKEN_EXPIRY * 1000),
        accessToken: "",
        refreshToken: "",
      },
    });

    // 2. Генерируем токены, передавая `sessionId` в `refreshToken`
    const accessToken = jwt.sign(
      { userId: user.id, sessionId: session.id },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: ACCESS_TOKEN_EXPIRY,
      }
    );

    const refreshToken = jwt.sign(
      { userId: user.id, sessionId: session.id },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: REFRESH_TOKEN_EXPIRY,
      }
    );

    // 3. Обновляем сессию, добавляя `refreshToken`
    await prisma.session.update({
      where: { id: session.id },
      data: { accessToken, refreshToken },
    });

    // 4. Записываем токены в куки
    res.setHeader("Set-Cookie", [
      serialize("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: REFRESH_TOKEN_EXPIRY,
      }),
    ]);

    return res
      .status(200)
      .json({ accessToken, refreshToken, user } as SignInResponse);
  } catch {
    return res.status(500).json({ error: "Ошибка сервера" });
  }
}
