import { dehydrate, QueryClient } from "@tanstack/react-query";

import { setUserFromCtx } from "@/entities/auth";

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

  build() {
    return dehydrate(this._state);
  }
}
