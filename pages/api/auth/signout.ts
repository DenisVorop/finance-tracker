import type { NextApiRequest, NextApiResponse } from "next";

import { AuthController } from "$/modules/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      return AuthController.SignOut(req, res);
    default:
      return res.status(405).json({ error: "Метод не разрешён" });
  }
}
