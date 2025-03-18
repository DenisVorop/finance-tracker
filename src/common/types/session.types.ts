import type { Session, User } from "@prisma/client";

export interface SessionDto extends Session {
  user: Omit<User, "password">;
}
