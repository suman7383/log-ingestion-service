import { LogEntry } from "#domain/log/LogEntry.js";

type SearchLogParams = {
  service: string;
  level?: number;
  from?: Date;
  to?: Date;
  limit: number;
  offset: number;
};

export interface LogRepository {
  saveSingle(entry: LogEntry): Promise<void>;

  saveBatch(entries: LogEntry[]): Promise<void>;

  search(params: SearchLogParams): Promise<LogEntry[]>;
}
