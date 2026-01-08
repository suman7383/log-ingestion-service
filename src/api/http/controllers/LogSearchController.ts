import { LogSearchService } from "#application/use-cases/search-logs/LogSearchService.js";
import { SearchParams } from "#shared/types/index.js";
import { NextFunction, Request, Response } from "express";
import { logger } from "../../../../utils/logger.js";

export class LogSearchController {
  private logSearchService: LogSearchService;

  constructor(logSearchService: LogSearchService) {
    this.logSearchService = logSearchService;
  }

  search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query as unknown as SearchParams;

      const logs = await this.logSearchService.search({
        limit: query.limit,
        offset: query.offset,
        service: query.service,
        level: query.level,
        from: query.from,
        to: query.to,
      });

      logger.info("[SEARCH] query:", query);

      res.status(200).json({
        data: logs,
      });
    } catch (err: unknown) {
      logger.error("[SEARCH] error:", err);

      next(err);
    }
  };
}
