import { ErrorStatusCode } from "./ErrorCode.js";

export interface AppErrorOpt {
  code: string;
  details?: Record<string, unknown>;
  isOperational: boolean;
  msg?: string;
  statusCode: ErrorStatusCode;
  timestamp?: string;
}

export class AppError extends Error {
  private code: string;
  private details?: Record<string, unknown>;
  private isOperational: boolean;
  private msg?: string;
  private statusCode: ErrorStatusCode;
  private timestamp?: string;

  constructor({
    code,
    details,
    isOperational,
    msg,
    statusCode,
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
