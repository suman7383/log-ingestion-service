import { LogEntry, LogEntryOpt } from "#domain/log/LogEntry.js";

export interface LogRepository {
  saveBatch(entries: LogEntry[]): Promise<void>;

  saveSingle(entry: LogEntry): Promise<void>;

  search(params: SearchLogParams): Promise<LogEntryOpt[]>;
}

interface SearchLogParams {
  from?: Date;
  level?: number;
  limit: number;
  offset: number;
  service: string;
  to?: Date;
}
