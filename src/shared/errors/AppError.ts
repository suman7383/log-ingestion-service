type AppErrorOpt = {
  code: string;
  statusCode: number;
  isOperational: boolean;
  msg?: string;
  details?: unknown;
  timestamp?: string;
};

export class AppError extends Error {
  private code: string;
  private statusCode: number;
  private details?: unknown;
  private isOperational: boolean;
  private timestamp?: string;
  private msg?: string;

  constructor({
    code,
    statusCode,
    isOperational,
    msg,
    details,
    timestamp,
  }: AppErrorOpt) {
    super(msg ?? code);

    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.msg = msg;
    this.details = details;
    this.timestamp = timestamp;
  }
}
