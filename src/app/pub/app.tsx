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
      <div className="flex flex-col flex-grow flex-shrink-0 basis-full bg-gradient-to-tl from-black via-neutral-950 to-stone-900 to-90%">
        {withLayout(<Component {...restProps} />)}
      </div>
    </AppProvider>
  );
}
