import _isEmpty from "lodash/isEmpty";

import type { OperationsDto } from "common/types/operations.types";

export class OperationsModel {
  _isError: boolean;
  _isEmpty: boolean;
  _meta: { code: number; message: string } | undefined;

  static _emptyData: OperationsDto = {
    data: [],
    params: {
      page: 1,
      pageSize: 10,
    },
    total: 0,
    totalPages: 0,
  };

  private constructor(
    data: OperationsDto,
    isError?: boolean,
    isEmpty?: boolean,
    error?: { code: number; message: string }
  ) {
    Object.assign(this, data);
    this._isError = isError || false;
    this._isEmpty = isEmpty || false;
    this._meta = error;
  }

  static Error(error: { code: number; message: string }): OperationsModel {
    return new OperationsModel(this._emptyData, true, false, error);
  }

  static Empty(): OperationsModel {
    return new OperationsModel(this._emptyData, false, true);
  }

  static fromDTO(dto: OperationsDto): OperationsModel {
    return _isEmpty(dto.data)
      ? OperationsModel.Empty()
      : new OperationsModel(dto);
  }

  toDTO(): OperationsDto & { _isError: boolean; _isEmpty: boolean } {
    return JSON.parse(JSON.stringify(this));
  }
}
