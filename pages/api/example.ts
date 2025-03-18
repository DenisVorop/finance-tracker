// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "common/lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return await GET(req, res);
    default:
      throw new Error("Unknown method");
  }
}

export default handler;

async function GET(req: NextApiRequest, res: NextApiResponse) {
  const users = await prisma.user.findMany();

  return res.status(200).json({ hello: "world", users });
}
