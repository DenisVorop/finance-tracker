import { StateBuilder } from "@/app/lib/state-builder";
import { exampleApi } from "@/shared/api/example";
import { ExamplePage } from "@/pages/example";
import { protectedRoute } from "common/lib/protected-route";

export default ExamplePage;

export const getServerSideProps = protectedRoute(
  async (ctx: App.PageContext) => {
    const example = await exampleApi.getExample();

    ctx.req.__EXAMPLE__ = example;

    const initialState = StateBuilder.Init(ctx).setBaseData().build();

    return { props: { initialState } };
  }
);
