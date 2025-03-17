import type { ReactNode } from "react";
import { useCallback, useMemo, useEffect, useState } from "react";

import { useIsClient } from "@/hooks/use-is-client";

import type { SearchParams } from "./query-state.context";
import { QueryStateContext } from "./query-state.context";

export function QueryStateProvider({ children }: { children?: ReactNode }) {
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const { withClient } = useIsClient();

  useEffect(() => {
    /** Синхронизируемся при монтировании */
    setSearchParams(getQueryParams(window.location.search));

    /** Слушаем изменения */
    const handlePopState = () => {
      setSearchParams(getQueryParams(window.location.search));
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  /** Добавить параметр. Если такой ключ уже есть, то его значение будет заменено. */
  const add = useCallback((key: string, value: string | string[]) => {
    setSearchParams((prevParams) => {
      const newParams = { ...prevParams };
      newParams[key] = value;
      updateURLParams(newParams);
      return newParams;
    });
  }, []);

  /** Массовое добавление параметров. Значения, по совпадающим ключам, будут заменены. */
  const addMany = useCallback(
    (newEntries: Record<string, string | string[]>) => {
      setSearchParams((prevParams) => {
        const newParams = { ...prevParams };
        Object.entries(newEntries).forEach(([key, value]) => {
          newParams[key] = value;
        });
        updateURLParams(newParams);
        return newParams;
      });
    },
    []
  );

  /** Обновить существующий или добавить новый параметр. */
  const update = useCallback((key: string, value: string | string[]) => {
    setSearchParams((prevParams) => {
      const patch = patchParams(prevParams, key, value);
      updateURLParams(patch);
      return patch;
    });
  }, []);

  /** Массовое обновление параметров */
  const updateMany = useCallback(
    (newEntries: Record<string, string | string[]>) => {
      setSearchParams((prevParams) => {
        const patch = Object.entries(newEntries).reduce(
          (acc, [key, value]) => {
            const p = patchParams(acc, key, value);
            return { ...acc, ...p };
          },
          { ...prevParams }
        );
        updateURLParams(patch);
        return patch;
      });
    },
    []
  );

  /** Прочитать параметр */
  const get = useCallback(
    (key: string): string | string[] | undefined => searchParams[key],
    [searchParams]
  );

  /** Удалить параметр */
  const remove = useCallback((key: string) => {
    setSearchParams((prevParams) => {
      const { [key]: _, ...rest } = prevParams;
      updateURLParams(rest);
      return rest;
    });
  }, []);

  /** Массовое удаление параметров */
  const removeMany = useCallback((keys: string[]) => {
    setSearchParams((prevParams) => {
      const newParams = Object.fromEntries(
        Object.entries(prevParams).filter(([k]) => !keys.includes(k))
      );
      updateURLParams(newParams);
      return newParams;
    });
  }, []);

  /** Удалить значение из параметра */
  const removeValue = useCallback(
    (key: string, value: string) => {
      if (searchParams[key] === value) {
        remove(key);
        return;
      }

      if (Array.isArray(searchParams[key])) {
        const newValues = (searchParams[key] as string[]).filter(
          (v) => v !== value
        );

        if (newValues.length === 0) {
          /** Удаляем весь ключ, если массив стал пустым */
          remove(key);
        } else {
          setSearchParams((prevParams) => {
            const newParams = { ...prevParams, [key]: newValues };
            updateURLParams(newParams);
            return newParams;
          });
        }
      }
    },
    [remove, searchParams]
  );

  /** Проверить наличие параметра */
  const has = useCallback(
    (key: string): boolean => Object.hasOwn(searchParams, key),
    [searchParams]
  );

  /** Очистить все параметры */
  const clear = useCallback(() => {
    updateURLParams({});
    setSearchParams({});
  }, []);

  const ctx = useMemo(
    () => ({
      searchParams,
      add: withClient(add),
      addMany: withClient(addMany),
      update: withClient(update),
      updateMany: withClient(updateMany),
      get: withClient(get),
      remove: withClient(remove),
      removeMany: withClient(removeMany),
      removeValue: withClient(removeValue),
      has: withClient(has),
      clear: withClient(clear),
    }),
    [
      add,
      addMany,
      clear,
      get,
      has,
      remove,
      removeMany,
      removeValue,
      searchParams,
      update,
      updateMany,
      withClient,
    ]
  );

  return (
    <QueryStateContext.Provider value={ctx}>
      {children}
    </QueryStateContext.Provider>
  );
}

function getQueryParams(search: string): SearchParams {
  const params = new URLSearchParams(search);
  const queryParams: SearchParams = {};

  params.forEach((value, key) => {
    if (queryParams[key]) {
      if (typeof queryParams[key] === "string") {
        queryParams[key] = [queryParams[key] as string, value];
      } else {
        (queryParams[key] as string[]).push(value);
      }
    } else {
      queryParams[key] = value;
    }
  });

  return queryParams;
}

function updateURLParams(newParams: SearchParams) {
  const queryString = new URLSearchParams();
  Object.entries(newParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => {
        queryString.append(key, v);
      });
    } else if (typeof value === "string") {
      queryString.append(key, value);
    }
  });

  if (typeof window !== "undefined") {
    const search = queryString.toString();
    const path = window.location.pathname;
    const url = search ? `?${search}` : path;
    window.history.pushState({}, "", url);
  }
}

function patchParams(
  params: SearchParams,
  key: string,
  value: string | string[]
): SearchParams {
  const patchingParams = { ...params };
  if (!patchingParams[key]) patchingParams[key] = value;
  if (typeof patchingParams[key] === "string") {
    if (typeof value === "string") {
      patchingParams[key] = [
        ...new Set([patchingParams[key] as string, value]),
      ];
    } else if (Array.isArray(value)) {
      patchingParams[key] = [
        ...new Set([patchingParams[key] as string, ...value]),
      ];
    }
  }
  if (Array.isArray(patchingParams[key])) {
    if (typeof value === "string") {
      patchingParams[key] = [
        ...new Set([...(patchingParams[key] as string[]), value]),
      ];
    } else if (Array.isArray(value)) {
      patchingParams[key] = [
        ...new Set([...(patchingParams[key] as string[]), ...value]),
      ];
    }
  }

  return patchingParams;
}
