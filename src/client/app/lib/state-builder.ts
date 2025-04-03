import { dehydrate, QueryClient } from "@tanstack/react-query";

import { setUserFromCtx } from "@/entities/auth";
import { setBillFromCtx, setBillsFromCtx } from "@/entities/bills";
import { setOperationsFromCtx } from "@/entities/operations";

export class StateBuilder {
  readonly _ctx: App.PageContext;
  readonly _state: QueryClient;

  private constructor(ctx: App.PageContext) {
    this._ctx = ctx;
    this._state = new QueryClient();
  }

  static Init(ctx: App.PageContext) {
    return new StateBuilder(ctx);
  }

  setBaseData() {
    this._state.setQueryData(...setUserFromCtx(this._ctx));
    return this;
  }

  setBills() {
    this._state.setQueryData(...setBillsFromCtx(this._ctx));
    return this;
  }

  setBill() {
    this._state.setQueryData(...setBillFromCtx(this._ctx));
    return this;
  }

  setOperations() {
    this._state.setQueryData(...setOperationsFromCtx(this._ctx));
    return this;
  }

  build() {
    return dehydrate(this._state);
  }
}
