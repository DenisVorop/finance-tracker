import type { NextPage } from 'next';
import type { ComponentType, ReactElement, ReactNode } from 'react';

export type PageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  withLayout?: (page: ReactElement) => ReactNode;
};

export function injectLayout(Page: NextPage, Layout: ComponentType<{ children: ReactNode }>): PageWithLayout {
  const nextPage = Page as PageWithLayout;
  nextPage.withLayout = (page: ReactElement) => <Layout>{page}</Layout>;
  return nextPage;
}
