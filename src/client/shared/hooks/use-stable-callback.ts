/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from "react";

import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect";

/**
 * Возвращает стабильный коллбэк который можно использовать в зависимостях других хуков, а также в пропсах
 * мемоизированных компонентов. Использовать в случае, когда стандартный `useCallback` начинает зависеть от большого
 * количества внешних переменных.
 */
export function useStableCallback<T extends (...args: any[]) => any>(
  callback: T
): T {
  const callbackRef = useRef(callback);

  useIsomorphicLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback((...args: any[]) => {
    if (callbackRef.current) {
      return callbackRef.current(...args);
    }
    return undefined;
  }, []) as T;
}
