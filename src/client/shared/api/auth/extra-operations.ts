import type { AxiosRequestConfig } from "axios";

import type { SignUpFormData } from "common/schemas/signup.schema";
import type { SignInFormData } from "common/schemas/signin.schema";
import type { AuthModelDto } from "common/types/auth.types";
import type { SignInDto } from "common/types/signin.types";
import type { SessionDto } from "common/types/session.types";

import { authApiInstance } from "./api-instance";

export function signup(data: SignUpFormData, options?: AxiosRequestConfig) {
  return authApiInstance<AuthModelDto>(
    {
      url: `/auth/signup`,
      method: "POST",
      data,
    },
    options
  );
}

export function signin(data: SignInFormData, options?: AxiosRequestConfig) {
  return authApiInstance<SignInDto>(
    {
      url: `/auth/signin`,
      method: "POST",
      data,
    },
    options
  );
}

export function signout(options?: AxiosRequestConfig) {
  return authApiInstance<AuthModelDto>(
    {
      url: `/auth/signout`,
      method: "POST",
    },
    options
  );
}

export function getSessionUser(options?: AxiosRequestConfig) {
  return authApiInstance<SessionDto>(
    {
      url: `/auth/session`,
      method: "POST",
    },
    options
  );
}
