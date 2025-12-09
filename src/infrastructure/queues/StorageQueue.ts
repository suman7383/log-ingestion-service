import { LogEntry } from "#domain/log/LogEntry.js";
import { LogQueue } from "#domain/queue/Queue.js";

export class StorageQueue implements LogQueue {
  async dequeue(): Promise<LogEntry> {
    // TODO
  }

  async dequeueN(n: number): Promise<LogEntry[]> {
    // TODO
  }

  async enqueue(entry: LogEntry): Promise<string> {
    // TODO
  }

  async enqueueN(entries: LogEntry[]): Promise<string> {
    // TODO
  }
}
