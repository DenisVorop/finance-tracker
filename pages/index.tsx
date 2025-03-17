import { StateBuilder } from "@/app/lib/state-builder";
import { exampleApi } from "@/api/example";
import { ExamplePage } from "@/pages/example";

export default ExamplePage;

export const getServerSideProps = async (ctx: App.PageContext) => {
  const example = await exampleApi.getExample();

  ctx.req.__EXAMPLE__ = example;

  const initialState = StateBuilder.Init(ctx).setBaseData().build();

  return { props: { initialState } };
};
