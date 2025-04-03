import type { NextApiRequest, NextApiResponse } from "next/types";
import { serialize } from "cookie";

import { AuthService } from "./auth.service";

const REFRESH_TOKEN_EXPIRY = parseFloat(process.env.REFRESH_TOKEN_EXPIRY);

export class AuthController {
  static async SignOut(req: NextApiRequest, res: NextApiResponse) {
    const signout = (await AuthService.signOut(req)).toDTO();

    if (signout.code === 400) {
      return res.status(400).json({ error: "Неверные данные" });
    }

    if (signout.code === 500) {
      return res.status(500).json({ error: "Ошибка сервера" });
    }

    res
      .setHeader(
        "Set-Cookie",
        serialize("refreshToken", "", {
          sameSite: "strict",
          path: "/",
          maxAge: 0,
        })
      )
      .status(200)
      .json(signout);
  }

  static async SignUp(req: NextApiRequest, res: NextApiResponse) {
    const signup = await AuthService.signUp(req);

    if (signup._isEmpty) {
      return res
        .status(400)
        .json({ error: "Пользователь с таким email уже существует" });
    }

    if (signup._isError) {
      return res.status(500).json({ error: "Ошибка сервера" });
    }

    res.status(200).json(signup.toDTO());
  }

  static async SignIn(req: NextApiRequest, res: NextApiResponse) {
    const signin = await AuthService.signIn(req);

    if (signin._isEmpty) {
      return res.status(400).json({ error: "Неверный email или пароль" });
    }

    if (signin._isError) {
      return res.status(500).json({ error: "Ошибка сервера" });
    }

    const signinDto = signin.toDTO();

    res
      .setHeader(
        "Set-Cookie",
        serialize("refreshToken", signinDto.refreshToken, {
          httpOnly: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: REFRESH_TOKEN_EXPIRY,
        })
      )
      .status(200)
      .json(signinDto);
  }

  static async GetSession(req: NextApiRequest, res: NextApiResponse) {
    const session = await AuthService.getSession(req);

    if (session._isEmpty) {
      return res.status(401).json({ error: "Неавторизован" });
    }

    if (session._isError) {
      return res.status(500).json({ error: "Ошибка сервера" });
    }

    res.status(200).json(session.toDTO());
  }
}
