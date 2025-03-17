import { StateBuilder } from "@/app/lib/state-builder";
import { SignInPage } from "@/pages/signin";

export default SignInPage;

export const getServerSideProps = async (ctx: App.PageContext) => {
  const initialState = StateBuilder.Init(ctx).build();
  return { props: { initialState } };
};
