import { AppError, AppErrorOpt } from "./AppError.js";
import { ErrorCode, ErrorStatusCode } from "./ErrorCode.js";

type ValidationErrorOpt = Pick<AppErrorOpt, "details" | "msg">;

export class ValidationError extends AppError {
  constructor({ details, msg }: ValidationErrorOpt) {
    super({
      code: ErrorCode.VALIDATION_ERROR,
      details,
      isOperational: true,
      msg,
      statusCode: ErrorStatusCode.VALIDATION_ERROR,
      timestamp: new Date().toISOString(),
    });
  }
}
