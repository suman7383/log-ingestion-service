import { ErrorStatusCode } from "./ErrorCode.js";

export type AppErrorOpt = {
  code: string;
  statusCode: ErrorStatusCode;
  isOperational: boolean;
  msg?: string;
  details?: Record<string, any>;
  timestamp?: string;
};

export class AppError extends Error {
  private code: string;
  private statusCode: ErrorStatusCode;
  private details?: Record<string, any>;
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
