import { createContext, useContext } from 'react';

type SearchValue = string | string[] | undefined;
export type SearchParams = Record<string, SearchValue>;

interface QueryStateContext<T extends SearchParams> {
  searchParams: T;
  /** Добавить параметр. Если такой ключ уже есть, то его значение будет заменено. */
  add(key: keyof T, value: Exclude<T[keyof T], undefined>): void;
  /** Массовое добавление параметров. Значения, по совпадающим ключам, будут заменены. */
  addMany(newEntries: Record<keyof T, Exclude<T[keyof T], undefined>>): void;
  /** Обновить существующий или добавить новый параметр. */
  update(key: keyof T, value: Exclude<T[keyof T], undefined>): void;
  /** Массовое обновление параметров */
  updateMany(newEntries: Record<keyof T, Exclude<T[keyof T], undefined>>): void;
  /** Прочитать параметр */
  get(key: keyof T): T[keyof T];
  /** Удалить параметр */
  remove(key: keyof T): void;
  /** Массовое удаление параметров */
  removeMany(keys: Array<keyof T>): void;
  /** Удалить значение из параметра */
  removeValue(key: keyof T, value: string): void;
  /** Проверить наличие параметра */
  has(key: keyof T): boolean | undefined;
  /** Очистить все параметры */
  clear(): void;
}

const stub = () => {
  throw new Error('<QueryStateContextProvider> not found.');
};

export const QueryStateContext = createContext<QueryStateContext<SearchParams>>({
  searchParams: {},
  add: stub,
  addMany: stub,
  update: stub,
  updateMany: stub,
  get: stub,
  remove: stub,
  removeMany: stub,
  removeValue: stub,
  has: stub,
  clear: stub,
});

QueryStateContext.displayName = 'QueryStateContext';

export function useQueryState<T extends SearchParams>() {
  return useContext(QueryStateContext) as unknown as QueryStateContext<T>;
}
