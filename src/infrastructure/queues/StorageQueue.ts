import { LogEntry } from "#domain/log/LogEntry.js";
import { LogQueue } from "#domain/queue/Queue.js";
import { CircularQueue } from "#infrastructure/queues/CircularQueue.js";

export class StorageQueue implements LogQueue {
  private queue: CircularQueue<LogEntry>;

  constructor() {
    this.queue = new CircularQueue<LogEntry>();
  }

  dequeue(): LogEntry | null {
    const entry = this.queue.dequeue();

    return entry;
  }

  // dequeueN(n: number): LogEntry[] {
  //   // TODO
  // }

  enqueue(entry: LogEntry): string {
    const ok = this.queue.enqueue(entry);

    return ok;
  }

  // enqueueN(entries: LogEntry[]): string {
  //   // TODO
  // }
}
