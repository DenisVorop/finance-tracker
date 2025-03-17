import type { AppProps } from "next/app";
import type { DehydratedState } from "@tanstack/react-query";

import type { PageWithLayout } from "@/lib/next";

import { AppProvider } from "../providers/app.provider";

type AppPropsWithLayout<P> = AppProps<P> & {
  Component: PageWithLayout;
};

export function _App({
  Component,
  pageProps,
}: AppPropsWithLayout<{ initialState: DehydratedState }>) {
  const { initialState, ...restProps } = pageProps;

  const withLayout = Component.withLayout ?? ((page) => page);

  return (
    <AppProvider initialState={initialState}>
      <div className="flex flex-col flex-grow flex-shrink-0 basis-full">
        {withLayout(<Component {...restProps} />)}
      </div>
    </AppProvider>
  );
}
