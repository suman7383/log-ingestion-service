import { LogEntry, LogEntryOpt } from "#domain/log/LogEntry.js";
import { LogQueue } from "#domain/queue/Queue.js";

export class LogIngestService {
  private queue: LogQueue;

  constructor(queue: LogQueue) {
    this.queue = queue;
  }

  ingest = (data: LogEntryOpt): void => {
    // Create LogEntry instance from raw body
    const logEntry = new LogEntry({
      ...data,
    });

    // Push to queue
    this.queue.enqueue(logEntry);
  };
}
