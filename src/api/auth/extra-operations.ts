import type { AxiosRequestConfig } from "axios";

import type { SignUpFormData } from "$/signup.schema";
import type { SignInFormData } from "$/signin.schema";

import { authApiInstance } from "./api-instance";
import type { SessionResponse, SignInResponse } from "./types";

export function signup(data: SignUpFormData, options?: AxiosRequestConfig) {
  return authApiInstance<Types.VoidResponse>(
    {
      url: `/auth/signup`,
      method: "POST",
      data,
    },
    options
  );
}

export function signin(data: SignInFormData, options?: AxiosRequestConfig) {
  return authApiInstance<SignInResponse>(
    {
      url: `/auth/signin`,
      method: "POST",
      data,
    },
    options
  );
}

export function signout(options?: AxiosRequestConfig) {
  return authApiInstance<SignInResponse>(
    {
      url: `/auth/signout`,
      method: "POST",
    },
    options
  );
}

export function getSessionUser(
  refreshToken: string,
  options?: AxiosRequestConfig
) {
  return authApiInstance<SessionResponse>(
    {
      url: `/auth/session`,
      method: "POST",
      data: { refreshToken },
    },
    options
  );
}
