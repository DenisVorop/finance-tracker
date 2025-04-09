import _isEmpty from "lodash/isEmpty";

import type {
  ReportStatisticsDto,
  ReportStatisticsModelDto,
} from "common/types/reports.types";

export class StatisticsModel {
  data: ReportStatisticsDto | null = null;
  _isError: boolean;
  _isEmpty: boolean;
  _meta: { code: number; message: string } | undefined;

  private constructor(
    data: ReportStatisticsDto | null,
    isError?: boolean,
    isEmpty?: boolean,
    error?: { code: number; message: string }
  ) {
    this.data = data;
    this._isError = isError || false;
    this._isEmpty = isEmpty || false;
    this._meta = error;
  }

  static Error(error: { code: number; message: string }): StatisticsModel {
    return new StatisticsModel(null, true, false, error);
  }

  static Empty(): StatisticsModel {
    return new StatisticsModel(null, false, true);
  }

  static fromDTO(dto: ReportStatisticsDto): StatisticsModel {
    return _isEmpty(dto) ? StatisticsModel.Empty() : new StatisticsModel(dto);
  }

  toDTO(): ReportStatisticsModelDto {
    return JSON.parse(JSON.stringify(this));
  }
}
