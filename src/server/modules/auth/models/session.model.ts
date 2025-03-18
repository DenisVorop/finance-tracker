import _isEmpty from "lodash/isEmpty";

import type { SessionDto } from "common/types/session.types";

export class SessionModel {
  _isError: boolean;
  _isEmpty: boolean;

  static _emptyData: SessionDto | null = null;

  private constructor(
    data: SessionDto | null,
    isError?: boolean,
    isEmpty?: boolean
  ) {
    if (data?.user && "password" in data.user) {
      const { password: _, ...userWithoutPassword } = data.user;
      data = { ...data, user: userWithoutPassword };
    }

    Object.assign(this, data);
    this._isError = isError || false;
    this._isEmpty = isEmpty || false;
  }

  static Error(): SessionModel {
    return new SessionModel(this._emptyData, true);
  }

  static Empty(): SessionModel {
    return new SessionModel(this._emptyData, false, true);
  }

  static fromDTO(dto: SessionDto | null): SessionModel {
    return _isEmpty(dto) ? SessionModel.Empty() : new SessionModel(dto);
  }

  toDTO(): SessionDto & { _isError: boolean; _isEmpty: boolean } {
    return JSON.parse(JSON.stringify(this));
  }
}
