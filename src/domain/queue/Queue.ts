import { LogEntry } from "#domain/log/LogEntry.js";

export interface LogQueue {
  dequeue(): Promise<LogEntry>;

  dequeueN(n: number): Promise<LogEntry[]>;

  enqueue(entry: LogEntry): Promise<string>;

  enqueueN(entries: LogEntry[]): Promise<string>;
}
