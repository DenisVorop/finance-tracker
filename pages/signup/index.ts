import { StateBuilder } from "@/app/lib/state-builder";
import { SignUpPage } from "@/pages/signup";

export default SignUpPage;

export const getServerSideProps = async (ctx: App.PageContext) => {
  const initialState = StateBuilder.Init(ctx).build();
  return { props: { initialState } };
};
