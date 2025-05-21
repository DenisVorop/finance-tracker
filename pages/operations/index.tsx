import { DefaultLayout } from "@/app/layouts";
import { StateBuilder } from "@/app/lib/state-builder";
import { OperationsPage } from "@/pages/operations";
import { operationsApi } from "@/shared/api/operations";
import { injectLayout } from "@/shared/lib/next";
import { protectedRoute } from "common/lib/protected-route";

injectLayout(OperationsPage, DefaultLayout);

export default OperationsPage;

export const getServerSideProps = protectedRoute(
  async (ctx: App.PageContext) => {
    const operations = await operationsApi.getOperations(
      { page: 1, pageSize: 10 },
      { headers: ctx.req.headers }
    );

    ctx.req.__OPERATIONS__ = operations;

    const initialState = StateBuilder.Init(ctx)
      .setBaseData()
      .setOperations()
      .build();

    return { props: { initialState } };
  }
);
