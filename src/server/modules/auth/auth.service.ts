import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { NextApiRequest } from "next/types";

import { prisma } from "common/lib/prisma";
import { signUpSchema } from "common/schemas/signup.schema";

import { SessionModel } from "./models/session.model";
import { SignInModel } from "./models/signin.model";
import { AuthModel } from "./models/auth.model";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY = parseFloat(process.env.ACCESS_TOKEN_EXPIRY);
const REFRESH_TOKEN_EXPIRY = parseFloat(process.env.REFRESH_TOKEN_EXPIRY);

export class AuthService {
  static async signOut(req: NextApiRequest) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return AuthModel.Error({ code: 400 });
      }

      await prisma.session.deleteMany({
        where: { refreshToken },
      });

      return AuthModel.fromDTO({ status: "ok", code: 200 });
    } catch {
      return AuthModel.Error({ code: 500 });
    }
  }

  static async signUp(req: NextApiRequest) {
    try {
      const { email, password } = await signUpSchema.validate(req.body);

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return AuthModel.Empty();
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      await prisma.bill.create({
        data: {
          userId: user.id,
          name: "Основной счёт",
          type: "REGULAR",
          backgroundColor: "#33FF57",
          emoji: "💰",
        },
      });

      return AuthModel.fromDTO({ status: "ok", code: 200 });
    } catch {
      return AuthModel.Error();
    }
  }

  static async signIn(req: NextApiRequest) {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return SignInModel.Empty();

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) return SignInModel.Empty();

      const session = await prisma.session.create({
        data: {
          userId: user.id,
          expiresAt: new Date(Date.now() + ACCESS_TOKEN_EXPIRY * 1000),
          accessToken: "",
          refreshToken: "",
        },
      });

      const accessToken = this._createJwt(
        { userId: user.id, sessionId: session.id },
        ACCESS_TOKEN_SECRET,
        ACCESS_TOKEN_EXPIRY
      );

      const refreshToken = this._createJwt(
        { userId: user.id, sessionId: session.id },
        REFRESH_TOKEN_SECRET,
        REFRESH_TOKEN_EXPIRY
      );

      await prisma.session.update({
        where: { id: session.id },
        data: { accessToken, refreshToken },
      });

      return SignInModel.fromDTO({ accessToken, refreshToken });
    } catch {
      return SignInModel.Error();
    }
  }

  static async getSession(req: NextApiRequest): Promise<SessionModel> {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) return SessionModel.Empty();

      const decoded = this._decodeRefreshToken(refreshToken);

      if (!decoded) return SessionModel.Empty();

      const session = await prisma.session.findUnique({
        where: { id: decoded.sessionId },
        include: { user: true },
      });

      if (!session) return SessionModel.Empty();

      if (this._checkExpires((decoded.exp || -Infinity) * 1000)) {
        await prisma.session.delete({
          where: { id: decoded.sessionId },
        });

        return SessionModel.fromDTO(null);
      }

      let actualSession = session;

      if (this._checkExpires(session.expiresAt.getTime())) {
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

      return SessionModel.fromDTO(actualSession);
    } catch {
      return SessionModel.Error();
    }
  }

  private static _createJwt(
    data: { userId: number; sessionId: string },
    secret: string,
    expiresIn: number
  ) {
    return jwt.sign(data, secret, { expiresIn });
  }

  private static _decodeRefreshToken(refreshToken: string) {
    return jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as jwt.JwtPayload;
  }

  private static _checkExpires(timestamp: number) {
    return timestamp < Date.now();
  }
}
