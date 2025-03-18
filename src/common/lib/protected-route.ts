import type { DehydratedState } from "@tanstack/react-query";
import { parse } from "cookie";

import { authApi } from "@/shared/api/auth";

export function protectedRoute(
  handler: (
    ctx: App.PageContext
  ) => Promise<{ props: { initialState: DehydratedState } }>
) {
  return async (ctx: App.PageContext) => {
    try {
      const { refreshToken } = parse(ctx.req.headers.cookie || "");

      if (!refreshToken) {
        return {
          redirect: {
            destination: "/signin",
            permanent: false,
          },
        };
      }

      const session = await authApi.getSessionUser({
        headers: ctx.req.headers,
      });

      if (!session) {
        return {
          redirect: {
            destination: "/signin",
            permanent: false,
          },
        };
      }

      ctx.req.__USER__ = session.user;

      return handler(ctx);
    } catch {
      return {
        redirect: {
          destination: "/signin",
          permanent: false,
        },
      };
    }
  };
}
