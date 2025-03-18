import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

import { prisma } from "@/lib/prisma";
import { SessionResponse } from "@/api/auth";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
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
    const { refreshToken } = req.body;

    const decoded = jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET
    ) as jwt.JwtPayload;

    if (!decoded || !decoded.sessionId) {
      return res.status(200).json({
        meta: { _isError: true, message: "Неверный токен" },
        data: null,
      } as SessionResponse);
    }

    if ((decoded.exp || -Infinity) * 1000 < Date.now()) {
      await prisma.session.delete({
        where: { id: decoded.sessionId },
      });

      return res.status(200).json({
        meta: { _isError: true, message: "Сессия истекла" },
        data: null,
      } as SessionResponse);
    }

    const session = await prisma.session.findUnique({
      where: { id: decoded.sessionId },
      include: { user: true },
    });

    if (!session) {
      return res.status(200).json({
        meta: { _isError: true, message: "Сессия не найдена" },
        data: null,
      } as SessionResponse);
    }

    let actualSession = session;

    if (session.expiresAt < new Date()) {
      const newAccessToken = jwt.sign(
        { userId: session.user.id },
        ACCESS_TOKEN_SECRET,
        {
          expiresIn: ACCESS_TOKEN_EXPIRY,
        }
      );

      actualSession = await prisma.session.update({
        where: { id: session.id },
        data: {
          accessToken: newAccessToken,
          refreshToken,
          expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 минут
        },
        include: { user: true },
      });
    }

    const {
      user: { password: _, ...rest },
    } = actualSession;

    return res.status(200).json({
      meta: { _isError: false, message: "Успешно" },
      data: {
        ...actualSession,
        user: rest,
      },
    } as SessionResponse);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err });
    }
    return res.status(500);
  }
}
