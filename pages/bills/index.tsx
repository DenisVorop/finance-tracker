import { DefaultLayout } from "@/app/layouts";
import { StateBuilder } from "@/app/lib/state-builder";
import { BillsPage } from "@/pages/bills";
import { billsApi } from "@/shared/api/bills";
import { injectLayout } from "@/shared/lib/next";
import { protectedRoute } from "common/lib/protected-route";

injectLayout(BillsPage, DefaultLayout);

export default BillsPage;

export const getServerSideProps = protectedRoute(
  async (ctx: App.PageContext) => {
    const bills = await billsApi.getBills({
      headers: ctx.req.headers,
    });

    ctx.req.__BILLS__ = bills;

    const initialState = StateBuilder.Init(ctx)
      .setBaseData()
      .setBills()
      .build();

    return { props: { initialState } };
  }
);
