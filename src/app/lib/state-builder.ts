import { dehydrate, QueryClient } from "@tanstack/react-query";

import { selectPropositionsFromCtx } from "@/entities/example";

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
    this._state.setQueryData(...selectPropositionsFromCtx(this._ctx));
    return this;
  }

  build() {
    return dehydrate(this._state);
  }
}
