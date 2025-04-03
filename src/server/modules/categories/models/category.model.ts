import _isEmpty from "lodash/isEmpty";

import type { Category } from "common/types/category.types";

export class CategoryModel {
  _isError: boolean;
  _isEmpty: boolean;
  _meta: { code: number; message: string } | undefined;

  static _emptyData: Category | null = null;

  private constructor(
    data: Category | null,
    isError?: boolean,
    isEmpty?: boolean,
    error?: { code: number; message: string }
  ) {
    Object.assign(this, data);
    this._isError = isError || false;
    this._isEmpty = isEmpty || false;
    this._meta = error;
  }

  static Error(error: { code: number; message: string }): CategoryModel {
    return new CategoryModel(this._emptyData, true, false, error);
  }

  static Empty(): CategoryModel {
    return new CategoryModel(this._emptyData, false, true);
  }

  static fromDTO(dto: Category): CategoryModel {
    return _isEmpty(dto) ? CategoryModel.Empty() : new CategoryModel(dto);
  }

  toDTO(): Category & { _isError: boolean; _isEmpty: boolean } {
    return JSON.parse(JSON.stringify(this));
  }
}
