import { DefaultLayout } from "@/app/layouts";
import { StateBuilder } from "@/app/lib/state-builder";
import { OperationsPage } from "@/pages/operations";
import { injectLayout } from "@/shared/lib/next";
import { protectedRoute } from "common/lib/protected-route";

injectLayout(OperationsPage, DefaultLayout);

export default OperationsPage;

export const getServerSideProps = protectedRoute(
  async (ctx: App.PageContext) => {
    const initialState = StateBuilder.Init(ctx).setBaseData().build();

    return { props: { initialState } };
  }
);
