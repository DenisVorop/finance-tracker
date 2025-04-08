import { DefaultLayout } from "@/app/layouts";
import { StateBuilder } from "@/app/lib/state-builder";
import { ReportsPage } from "@/pages/reports";
import { injectLayout } from "@/shared/lib/next";
import { protectedRoute } from "common/lib/protected-route";

injectLayout(ReportsPage, DefaultLayout);

export default ReportsPage;

export const getServerSideProps = protectedRoute(
  async (ctx: App.PageContext) => {
    const initialState = StateBuilder.Init(ctx).setBaseData().build();

    return { props: { initialState } };
  }
);
