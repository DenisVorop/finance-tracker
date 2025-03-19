/* eslint-disable @typescript-eslint/consistent-type-imports */

import type { User } from "@prisma/client";

declare module "next" {
  import type { NextApiRequest } from "next";

  interface NextApiRequest {
    __USER__: Omit<User, "password">;
  }
}
