import { AppError, AppErrorOpt } from "./AppError.js";
import { ErrorCode, ErrorStatusCode } from "./ErrorCode.js";

export class ServerError extends AppError {

  constructor(details?: Pick<AppErrorOpt, 'details'>){
    super({
      code: ErrorCode.SERVER_ERROR,
      statusCode: ErrorStatusCode.SERVER_ERROR,
      isOperational: true,
      msg: "Internal Server Error",
      details,
      timestamp: new Date().toISOString();
    });
  }
}
