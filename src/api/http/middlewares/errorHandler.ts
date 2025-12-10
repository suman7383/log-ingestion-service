import { AppError } from "#shared/errors/AppError.js";
import { ServerError } from "#shared/errors/ServerError.js";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    sendErrorResponse(err, res);
    return;
  }

  // TODO- Log the error
  sendErrorResponse(new ServerError(), res);
};

const sendErrorResponse = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    error: {
      code: err.code,
      details: err.details,
      message: err.message,
    },
  });
};
