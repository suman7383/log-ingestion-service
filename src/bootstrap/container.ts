import { LogIngestController } from "#api/http/controllers/LogIngestController.js";
import { FlushLogsService } from "#application/use-cases/flush-logs/FlushLogsService.js";
import { LogIngestService } from "#application/use-cases/ingest-logs/LogIngestService.js";
import { MongoLogRepository } from "#infrastructure/db/mongo/MongoLogRepository.js";
import { StorageQueue } from "#infrastructure/queues/StorageQueue.js";

export const storageQueue = new StorageQueue();
export const logIngestService = new LogIngestService(storageQueue);
export const logIngestController = new LogIngestController(logIngestService);
export const logRepository = new MongoLogRepository();
export const flushLogsService = FlushLogsService.createInstance(
  storageQueue,
  logRepository,
);
