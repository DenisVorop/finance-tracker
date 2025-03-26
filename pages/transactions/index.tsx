import { StateBuilder } from "@/app/lib/state-builder";
import TransactionsPage from "@/pages/transactions/transactions-page";
import { protectedRoute } from "common/lib/protected-route";

export default TransactionsPage;

export const getServerSideProps = protectedRoute(async (ctx) => {
  const initialState = StateBuilder.Init(ctx)
    .setBaseData()
    .build();

  return {
    props: {
      initialState,
    },
  };
}); 