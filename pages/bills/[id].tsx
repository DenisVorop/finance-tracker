import { DefaultLayout } from "@/app/layouts";
import { StateBuilder } from "@/app/lib/state-builder";
import { BillPage } from "@/pages/bill";
import { billsApi } from "@/shared/api/bills";
import { injectLayout } from "@/shared/lib/next";
import { protectedRoute } from "common/lib/protected-route";

injectLayout(BillPage, DefaultLayout);

export default BillPage;

export const getServerSideProps = protectedRoute(
  async (ctx: App.PageContext) => {
    const id = ctx.query.id;

    const bill = await billsApi.getBill(Number(id), {
      headers: ctx.req.headers,
    });

    ctx.req.__BILL__ = bill;

    const initialState = StateBuilder.Init(ctx).setBaseData().setBill().build();

    return { props: { initialState } };
  }
);
