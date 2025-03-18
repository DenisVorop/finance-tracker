import { useCallback, useEffect, useState } from 'react';

export function useIsClient(): {
  isClient: boolean;

  /** Обёртка для выполнения функции только на клиенте */
  withClient: <T extends (...args: any[]) => any>(fn: T) => (...args: Parameters<T>) => ReturnType<T> | undefined;
} {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const withClient = useCallback(
    <T extends (...args: any[]) => any>(fn: T) =>
      (...args: Parameters<T>): ReturnType<T> | undefined => {
        if (isClient) {
          return fn(...args);
        }
        return undefined;
      },
    [isClient],
  );

  return { isClient, withClient };
}
