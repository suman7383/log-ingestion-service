import { LogEntry } from "#domain/log/LogEntry.js";

export interface LogQueue {
  dequeue(): LogEntry | null;

  // dequeueN(n: number): LogEntry[];

  enqueue(entry: LogEntry): string;

  // enqueueN(entries: LogEntry[]): string;
}
