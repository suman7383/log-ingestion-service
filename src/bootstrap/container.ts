import { LogIngestController } from "#api/http/controllers/LogIngestController.js";
import { LogIngestService } from "#application/use-cases/ingest-logs/LogIngestService.js";
import { StorageQueue } from "#infrastructure/queues/StorageQueue.js";

export const storageQueue = new StorageQueue();
export const logIngestService = new LogIngestService(storageQueue);
export const logIngestController = new LogIngestController(logIngestService);
