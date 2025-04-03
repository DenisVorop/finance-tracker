import { AuthLayout } from "@/app/layouts";
import { StateBuilder } from "@/app/lib/state-builder";
import { SignUpPage } from "@/pages/signup";
import { injectLayout } from "@/shared/lib/next";

injectLayout(SignUpPage, AuthLayout);

export default SignUpPage;

export const getServerSideProps = async (ctx: App.PageContext) => {
  const initialState = StateBuilder.Init(ctx).build();
  return { props: { initialState } };
};
