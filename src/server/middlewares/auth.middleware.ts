import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

import { AuthService } from "$/modules/auth/auth.service";

export function authMiddleware(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await AuthService.getSession(req);

    req.__USER__ = session.toDTO().user;

    return handler(req, res);
  };
}
