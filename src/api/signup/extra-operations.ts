import type { AxiosRequestConfig } from "axios";
import type { User } from "@prisma/client";

import type { SignUpFormData } from "$/signup.schema";

import { signupApiInstance } from "./api-instance";

export type SignUpResponse = Omit<User, "password">;

export function signup(data: SignUpFormData, options?: AxiosRequestConfig) {
  return signupApiInstance<SignUpResponse>(
    {
      url: `/signup`,
      method: "POST",
      data,
    },
    options
  );
}
