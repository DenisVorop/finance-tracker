interface TransactionDTO {
  data: {
    id: number;
    date: Date;
    amount: number;
    description: string;
    category: string;
    billName: string;
  }[];
}

interface ErrorDTO {
  code: number;
  message: string;
}

export class TransactionsModel {
  static fromDTO(dto: TransactionDTO) {
    return {
      success: true,
      data: dto.data,
    };
  }

  static Error(dto: ErrorDTO) {
    return {
      success: false,
      error: {
        code: dto.code,
        message: dto.message,
      },
    };
  }
} 