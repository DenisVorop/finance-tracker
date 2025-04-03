/* eslint-disable @typescript-eslint/consistent-type-imports */

/**
 * Для того, чтобы данные типы были доступны в глобальной области видимости, в данный файл нельзя импортировать модули
 * через обычный `import`, т.к. TS будет воспринимать данный файл модулем. Если в данный файл необходимо что-то импортировать,
 * необходимо использовать следующий синтаксис:
 * @example `type Example = import('path/to/module').Example;`
 * @link [stackoverflow](https://stackoverflow.com/questions/39040108/import-class-in-definition-file-d-ts)
 */

declare namespace App {
  type BaseIncomingMessage = import("http").IncomingMessage;
  type ParsedUrlQuery = import("node:querystring").ParsedUrlQuery;

  /** Next */
  type NextPageContext = import("next").NextPageContext;
  type NextAppContext = import("next/app").AppContext;
  type NextDocumentContext = import("next/document").DocumentContext;

  /** Extensions */
  type Example = import("path/to/module").Example;
  type User = import("common/types/session.types").SessionDto["user"];
  type Bills = import("common/types/bill.types").BillsDto;
  type Bill = import("common/types/bill.types").Bill;
  type Operations = import("common/types/operations.types").OperationsModelDto;
  type Categories = import("common/types/category.types").CategoriesDto;

  interface IncomingMessage<B extends Record<string, unknown> = unknown>
    extends BaseIncomingMessage {
    body?: B;
    __EXAMPLE__: { hello: string };
    __USER__?: User;
    __BILLS__?: Bills;
    __BILL__?: Bill;
    __OPERATIONS__?: Operations;
    __CATEGORIES__?: Categories;
  }

  export interface ExtendedContext<
    P extends Record<string, unknown> = unknown,
    Q extends ParsedUrlQuery = ParsedUrlQuery,
    B extends Record<string, unknown> = unknown
  > {
    req: IncomingMessage<B>;
    params: P;
    query: Q;
  }

  export interface PageContext extends NextPageContext {
    req: IncomingMessage;
  }

  export interface DocumentContext extends NextDocumentContext {
    req: IncomingMessage;
  }
}
