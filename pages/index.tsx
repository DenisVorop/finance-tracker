import { StateBuilder } from "@/app/lib/state-builder";
import { exampleApi } from "@/api/example";
import { ExamplePage } from "@/pages/example";
import { DehydratedState } from "@tanstack/react-query";
import { parse } from "cookie";
import { authApi } from "@/api/auth";

export default ExamplePage;

export const getServerSideProps = protectedRoute(
  async (ctx: App.PageContext) => {
    const example = await exampleApi.getExample();
    ctx.req.__EXAMPLE__ = example;
    const initialState = StateBuilder.Init(ctx).setBaseData().build();
    return { props: { initialState } };
  }
);

function protectedRoute(
  handler: (
    ctx: App.PageContext
  ) => Promise<{ props: { initialState: DehydratedState } }>
) {
  return async (ctx: App.PageContext) => {
    const { refreshToken } = parse(ctx.req.headers.cookie || "");

    if (!refreshToken) {
      return {
        redirect: {
          destination: "/signin",
          permanent: false,
        },
      };
    }

    const { meta, data } = await authApi.getSessionUser(refreshToken);

    if (meta._isError) {
      return {
        redirect: {
          destination: "/signin",
          permanent: false,
        },
      };
    }

    ctx.req.__USER__ = data;

    return handler(ctx);
  };
}
