import { LogEntry } from "#domain/log/LogEntry.js";
import { LogRepository } from "#domain/log/LogRepository.js";
import { LogQueue } from "#domain/queue/Queue.js";

const BATCH_SIZE = 10;
const BATCH_TIMEOUT = 1_000; // in milliseconds
const FETCH_INTERVAL = 5_000; // in milliseconds

export class FlushLogsService {
  private static instance: FlushLogsService | null = null;
  private logRepository: LogRepository;
  private queue: LogQueue;

  private constructor(queue: LogQueue, logRepo: LogRepository) {
    this.queue = queue;
    this.logRepository = logRepo;
  }

  startExecute() {
    this.execute();
  }

  static createInstance(queue: LogQueue, logRepo: LogRepository) {
    return (FlushLogsService.instance ??= new FlushLogsService(queue, logRepo));
  }

  static getInstance() {
    if (!FlushLogsService.instance) throw new Error("Not instantiated");

    return FlushLogsService.instance;
  }

  private execute() {
    let start = Date.now();
    let items: LogEntry[] = [];

    const loop = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      while (true) {
        const log = this.queue.dequeue();

        if (log) items.push(log);

        const batchReady =
          items.length >= BATCH_SIZE ||
          (items.length > 0 && Date.now() - start >= BATCH_TIMEOUT);

        if (batchReady) {
          const logsToSave = items;
          items = [];

          await this.saveBatch(logsToSave);

          start = Date.now();
        }

        await this.sleep(FETCH_INTERVAL);
      }
    };

    loop().catch((err: unknown) => {
      console.error("BATCH loop crashed:", err);
    });
  }

  private async saveBatch(logs: LogEntry[]): Promise<void> {
    await this.logRepository.saveBatch(logs);
  }

  private sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
}
