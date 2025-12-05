export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export function normalizeLogLevel(level: string): LogLevel {
  const upper = level.trim().toUpperCase();

  switch (upper) {
    case "DEBUG":
      return LogLevel.DEBUG;
    case "INFO":
      return LogLevel.INFO;
    case "WARN":
      return LogLevel.WARN;
    case "ERROR":
      return LogLevel.ERROR;
    default:
      throw new Error(`Invalid log level: ${level}`);
  }
}
