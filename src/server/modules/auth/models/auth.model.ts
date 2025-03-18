import type { AuthModelDto } from "common/types/auth.types";

export class AuthModel {
  _isError: boolean;
  _isEmpty: boolean;

  static _emptyData: AuthModelDto = {
    code: 400,
    status: "initial",
  };

  private constructor(
    data: AuthModelDto,
    isError?: boolean,
    isEmpty?: boolean
  ) {
    Object.assign(this, data);
    this._isError = isError || false;
    this._isEmpty = isEmpty || false;
  }

  static Error(dto: Partial<AuthModelDto> = {}): AuthModel {
    return new AuthModel({ ...this._emptyData, ...dto }, true);
  }

  static Empty(dto: Partial<AuthModelDto> = {}): AuthModel {
    return new AuthModel({ ...this._emptyData, ...dto }, false, true);
  }

  static fromDTO(dto: AuthModelDto): AuthModel {
    return dto.status === "initial" ? AuthModel.Empty() : new AuthModel(dto);
  }

  toDTO(): AuthModelDto & { _isError: boolean; _isEmpty: boolean } {
    return JSON.parse(JSON.stringify(this));
  }
}
