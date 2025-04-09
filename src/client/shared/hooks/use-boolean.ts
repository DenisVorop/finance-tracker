import { useCallback, useState } from "react";

export function useBoolean(initialValue: boolean) {
  const [value, setValue] = useState(initialValue);

  const on = useCallback(() => setValue(true), []);
  const off = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((prev) => !prev), []);

  return [value, { on, off, toggle }];
}
