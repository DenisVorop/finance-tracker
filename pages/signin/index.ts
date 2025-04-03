import { AuthLayout } from "@/app/layouts";
import { StateBuilder } from "@/app/lib/state-builder";
import { SignInPage } from "@/pages/signin";
import { injectLayout } from "@/shared/lib/next";

injectLayout(SignInPage, AuthLayout);

export default SignInPage;

export const getServerSideProps = async (ctx: App.PageContext) => {
  const initialState = StateBuilder.Init(ctx).build();
  return { props: { initialState } };
};
