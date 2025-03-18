import { signin, signup, signout, getSessionUser } from "./extra-operations";
export type { SignInResponse, SessionResponse } from "./types";

export const authApi = {
  signin,
  signup,
  signout,
  getSessionUser,
};
