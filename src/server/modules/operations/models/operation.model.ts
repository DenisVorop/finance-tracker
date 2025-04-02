import _isEmpty from "lodash/isEmpty";

import type { Operation } from "common/types/operations.types";

export class OperationModel {
  _isError: boolean;
  _isEmpty: boolean;
  _meta: { code: number; message: string } | undefined;

  static _emptyData: Operation | null = null;

  private constructor(
    data: Operation | null,
    isError?: boolean,
    isEmpty?: boolean,
    error?: { code: number; message: string }
  ) {
    Object.assign(this, data);
    this._isError = isError || false;
    this._isEmpty = isEmpty || false;
    this._meta = error;
  }

  static Error(error: { code: number; message: string }): OperationModel {
    return new OperationModel(this._emptyData, true, false, error);
  }

  static Empty(): OperationModel {
    return new OperationModel(this._emptyData, false, true);
  }

  static fromDTO(dto: Operation): OperationModel {
    return _isEmpty(dto) ? OperationModel.Empty() : new OperationModel(dto);
  }

  toDTO(): Operation & { _isError: boolean; _isEmpty: boolean } {
    return JSON.parse(JSON.stringify(this));
  }
}
