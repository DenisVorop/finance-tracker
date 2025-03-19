import { DefaultLayout } from "@/app/layouts";
import { StateBuilder } from "@/app/lib/state-builder";
import { BillsPage } from "@/pages/bills";
import { injectLayout } from "@/shared/lib/next";
import { protectedRoute } from "common/lib/protected-route";

injectLayout(BillsPage, DefaultLayout);

export default BillsPage;

export const getServerSideProps = protectedRoute(
  async (ctx: App.PageContext) => {
    const initialState = StateBuilder.Init(ctx).setBaseData().build();

    return { props: { initialState } };
  }
);
