import { LogIngestService } from "#application/use-cases/ingest-logs/LogIngestService.js";
import { LogEntryOpt } from "#domain/log/LogEntry.js";
import { QueueFullError } from "#infrastructure/queues/CircularQueue.js";
import { ServiceUnavailableError } from "#shared/errors/ServerError.js";
import { NextFunction, Request, Response } from "express";

export class LogIngestController {
  private logIngestionService: LogIngestService;

  constructor(logIngestService: LogIngestService) {
    this.logIngestionService = logIngestService;
  }

  ingest = (req: Request, res: Response, next: NextFunction) => {
    // TODO -> Validate the data before passing to service
    try {
      this.logIngestionService.ingest(req.body as LogEntryOpt);

      res.sendStatus(200);
    } catch (err: unknown) {
      if (err instanceof QueueFullError) {
        throw new ServiceUnavailableError(err.message);
      }

      next(err);
    }
  };
}
