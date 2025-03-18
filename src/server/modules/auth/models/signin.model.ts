import _isEmpty from "lodash/isEmpty";

import type { SignInDto } from "common/types/signin.types";

export class SignInModel {
  _isError: boolean;
  _isEmpty: boolean;

  static _emptyData: SignInDto | null = null;

  private constructor(
    data: SignInDto | null,
    isError?: boolean,
    isEmpty?: boolean
  ) {
    Object.assign(this, data);
    this._isError = isError || false;
    this._isEmpty = isEmpty || false;
  }

  static Error(): SignInModel {
    return new SignInModel(this._emptyData, true);
  }

  static Empty(): SignInModel {
    return new SignInModel(this._emptyData, false, true);
  }

  static fromDTO(dto: SignInDto | null): SignInModel {
    return _isEmpty(dto) ? SignInModel.Empty() : new SignInModel(dto);
  }

  toDTO(): SignInDto & { _isError: boolean; _isEmpty: boolean } {
    return JSON.parse(JSON.stringify(this));
  }
}
