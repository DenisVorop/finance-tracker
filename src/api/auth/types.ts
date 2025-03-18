import type { User } from "@prisma/client";

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  user: Omit<User, "password">;
}

export interface SessionResponse {
  meta: { _isError: boolean; message: string };
  data: SignInResponse | null;
}
