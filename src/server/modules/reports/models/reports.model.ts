import _isEmpty from "lodash/isEmpty";

import type { ReportDto, ReportsModelDto } from "common/types/reports.types";

export class ChartOperationsModel {
  data: ReportDto[] = [];
  _isError: boolean;
  _isEmpty: boolean;
  _meta: { code: number; message: string } | undefined;

  static _emptyData: ReportDto[] = [];

  private constructor(
    data: ReportDto[] = [],
    isError?: boolean,
    isEmpty?: boolean,
    error?: { code: number; message: string }
  ) {
    this.data = data || [];
    this._isError = isError || false;
    this._isEmpty = isEmpty || false;
    this._meta = error;
  }

  static Error(error: { code: number; message: string }): ChartOperationsModel {
    return new ChartOperationsModel(this._emptyData, true, false, error);
  }

  static Empty(): ChartOperationsModel {
    return new ChartOperationsModel(this._emptyData, false, true);
  }

  static fromDTO(dto: ReportDto[]): ChartOperationsModel {
    return _isEmpty(dto)
      ? ChartOperationsModel.Empty()
      : new ChartOperationsModel(dto);
  }

  toDTO(): ReportsModelDto {
    return JSON.parse(JSON.stringify(this));
  }
}
