import _isEmpty from "lodash/isEmpty";

import type { CategoriesDto } from "common/types/category.types";

export class CategoriesModel {
  _isError: boolean;
  _isEmpty: boolean;
  _meta: { code: number; message: string } | undefined;
  categories: CategoriesDto["categories"];

  private constructor(
    data: CategoriesDto["categories"],
    isError?: boolean,
    isEmpty?: boolean,
    error?: { code: number; message: string }
  ) {
    this.categories = data || [];
    this._isError = isError || false;
    this._isEmpty = isEmpty || false;
    this._meta = error;
  }

  static Error(error: { code: number; message: string }): CategoriesModel {
    return new CategoriesModel([], true, false, error);
  }

  static Empty(): CategoriesModel {
    return new CategoriesModel([], false, true);
  }

  static fromDTO(dto: CategoriesDto["categories"]): CategoriesModel {
    return _isEmpty(dto) ? CategoriesModel.Empty() : new CategoriesModel(dto);
  }

  toDTO(): CategoriesDto {
    return JSON.parse(JSON.stringify(this));
  }
}
