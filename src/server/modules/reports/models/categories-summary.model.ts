import _isEmpty from "lodash/isEmpty";

import type {
  CategorySummaryDto,
  CategorySummaryModelDto,
} from "common/types/reports.types";

export class CategoriesSummaryModel {
  data: CategorySummaryDto[] = [];
  _isError: boolean;
  _isEmpty: boolean;
  _meta: { code: number; message: string } | undefined;

  private static _emptyData = [];

  private constructor(
    data: CategorySummaryDto[],
    isError?: boolean,
    isEmpty?: boolean,
    error?: { code: number; message: string }
  ) {
    this.data = data;
    this._isError = isError || false;
    this._isEmpty = isEmpty || false;
    this._meta = error;
  }

  static Error(error: {
    code: number;
    message: string;
  }): CategoriesSummaryModel {
    return new CategoriesSummaryModel(this._emptyData, true, false, error);
  }

  static Empty(): CategoriesSummaryModel {
    return new CategoriesSummaryModel(this._emptyData, false, true);
  }

  static fromDTO(dto: CategorySummaryDto[]): CategoriesSummaryModel {
    return _isEmpty(dto)
      ? CategoriesSummaryModel.Empty()
      : new CategoriesSummaryModel(dto);
  }

  toDTO(): CategorySummaryModelDto {
    return JSON.parse(JSON.stringify(this));
  }
}
