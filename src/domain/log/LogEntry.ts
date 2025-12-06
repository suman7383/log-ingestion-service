import { LogLevel, normalizeLogLevel } from "#domain/log/LogLevel.js";
import { ValidationError } from "#shared/errors/ValidationError.js";

type LogEntryOpt = {
  timestamp: string;
  service: string;
  level: string;
  message: string;
  requestId?: string;
  metadata?: Record<string, any>;
  receivedAt?: Date;
};

export class LogEntry {
  readonly timestamp: Date;
  readonly service: string;
  readonly level: LogLevel;
  readonly message: string;
  readonly requestId?: string;
  readonly metadata?: Record<string, any>;
  readonly receivedAt: Date;

  constructor({
    level,
    message,
    service,
    timestamp,
    metadata,
    receivedAt,
    requestId,
  }: LogEntryOpt) {
    this.timestamp = new Date(timestamp);
    if (isNaN(this.timestamp.getTime())) {
      throw new ValidationError({
        msg: "Invalid timestamp",
      });
    }

    if (!service) {
      throw new ValidationError({ msg: "service name cannot be empty" });
    }

    this.service = service.trim().toLowerCase();

    this.level = typeof level === "string" ? normalizeLogLevel(level) : level;

    if (!message || message.trim().length === 0) {
      throw new ValidationError({ msg: "message field cannot be empty" });
    }
    this.message = message;

    if (metadata && typeof metadata !== "object") {
      throw new ValidationError({
        msg: "metadata field should be typeof object",
      });
    }
    this.metadata = metadata;

    this.requestId = requestId;
    this.receivedAt = receivedAt ?? new Date();
  }

  // Sorting helper (timestamp asc, severity desc)
  compare(other: LogEntry): number {
    if (this.timestamp.getTime() !== other.timestamp.getTime()) {
      return this.timestamp.getTime() - other.timestamp.getTime();
    }

    return other.level - this.level;
  }
}
