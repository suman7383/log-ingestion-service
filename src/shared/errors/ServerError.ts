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
