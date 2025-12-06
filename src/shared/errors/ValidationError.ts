import { AppError, AppErrorOpt } from "./AppError.js";
import { ErrorCode, ErrorStatusCode } from "./ErrorCode.js";

type ValidationErrorOpt = Pick<AppErrorOpt, "msg" | "details">;

export class ValidationError extends AppError {
  constructor({ msg, details }: ValidationErrorOpt) {
    super({
      code: ErrorCode.VALIDATION_ERROR,
      statusCode: ErrorStatusCode.VALIDATION_ERROR,
      isOperational: true,
      msg,
      details,
      timestamp: new Date().toISOString(),
    });
  }
}
