import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { serialize } from "cookie";

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
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({ error: "Токен отсутствует" });
    }

    await prisma.session.deleteMany({
      where: { refreshToken },
    });

    res.setHeader("Set-Cookie", [
      serialize("refreshToken", "", {
        sameSite: "strict",
        path: "/",
        maxAge: 0,
      }),
    ]);

    return res.status(200).json({ message: "Выход выполнен успешно" });
  } catch (err) {
    return res.status(500).json({ error: "Ошибка сервера" });
  }
}
