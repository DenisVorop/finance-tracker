import _isEmpty from "lodash/isEmpty";

import type { BillsDto } from "common/types/bill.types";

export class BillsModel {
  _isError: boolean;
  _isEmpty: boolean;
  _meta: { code: number; message: string } | undefined;

  static _emptyData: BillsDto = { data: [] };

  private constructor(
    data: BillsDto,
    isError?: boolean,
    isEmpty?: boolean,
    error?: { code: number; message: string }
  ) {
    Object.assign(this, data);
    this._isError = isError || false;
    this._isEmpty = isEmpty || false;
    this._meta = error;
  }

  static Error(error: { code: number; message: string }): BillsModel {
    return new BillsModel(this._emptyData, true, false, error);
  }

  static Empty(): BillsModel {
    return new BillsModel(this._emptyData, false, true);
  }

  static fromDTO(dto: BillsDto): BillsModel {
    return _isEmpty(dto.data) ? BillsModel.Empty() : new BillsModel(dto);
  }

  toDTO(): BillsDto & { _isError: boolean; _isEmpty: boolean } {
    return JSON.parse(JSON.stringify(this));
  }
}
