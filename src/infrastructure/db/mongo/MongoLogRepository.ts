import { LogEntry, LogEntryOpt } from "#domain/log/LogEntry.js";
import { LogRepository } from "#domain/log/LogRepository.js";

import { logModel } from "./LogSchema.js";

export class MongoLogRepository implements LogRepository {
  async saveBatch(entries: LogEntry[]): Promise<void> {
    const logs = entries.map((log) => {
      return new logModel({
        level: log.level,
        message: log.message,
        metadata: log.metadata,
        receivedAt: log.receivedAt,
        requestId: log.requestId,
        service: log.service,
        timestamp: log.timestamp,
      });
    });

    try {
      await logModel.bulkSave(logs);
    } catch (err) {
      // TODO- replace with logger
      console.error("[SaveBatch] operation failed, error:", err);
      throw err;
    }
  }

  async saveSingle(entry: LogEntry): Promise<void> {
    const log = new logModel({
      level: entry.level,
      message: entry.message,
      metadata: entry.metadata,
      receivedAt: entry.receivedAt,
      requestId: entry.requestId,
      service: entry.service,
      timestamp: entry.timestamp,
    });

    await log.save();
  }

  async search(params: {
    from?: Date;
    level?: number;
    limit: number;
    offset: number;
    service: string;
    to?: Date;
  }): Promise<LogEntryOpt[]> {
    // TODO
    const filter = {
      level: params.level,
      service: params.service,
      timestamp: {
        $gte: params.from,
        $lt: params.to,
      },
    };

    const logs = await logModel
      .find(filter)
      .skip(params.offset)
      .limit(params.limit)
      .sort({ timestamp: "asc" })
      .lean();

    return logs;
  }
}
