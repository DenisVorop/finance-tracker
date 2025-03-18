import { useQuery } from "@tanstack/react-query";

import type { Example } from "@/shared/api/example";
import { exampleApi } from "@/shared/api/example";

const KEY = "example";

export const selectPropositionsFromCtx = (ctx: App.PageContext) =>
  [[KEY], [ctx.req.__EXAMPLE__]] as const;

export function useExample() {
  const { data } = useQuery<Example>({
    queryKey: [KEY],
    queryFn: () => exampleApi.getExample(),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return data;
}
