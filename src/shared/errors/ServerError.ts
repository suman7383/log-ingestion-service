import { AppError, AppErrorOpt } from "./AppError.js";
import { ErrorCode, ErrorStatusCode } from "./ErrorCode.js";

export class ServerError extends AppError {
  constructor(details?: Pick<AppErrorOpt, "details">) {
    super({
      code: ErrorCode.SERVER_ERROR,
      details,
      isOperational: true,
      msg: "Internal Server Error",
      statusCode: ErrorStatusCode.SERVER_ERROR,
      timestamp: new Date().toISOString(),
    });
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(msg: string, details?: Pick<AppErrorOpt, "details">) {
    super({
      code: ErrorCode.SERVICE_UNAVAILABLE,
      details,
      isOperational: true,
      msg: msg,
      statusCode: ErrorStatusCode.SERVICE_UNAVAILABLE,
      timestamp: new Date().toISOString(),
    });
  }
}
