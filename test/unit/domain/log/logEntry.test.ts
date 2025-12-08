// TODO- write test for logEntry compare method
import { LogEntry } from "#domain/log/LogEntry.js";
import { LogLevel } from "#domain/log/LogLevel.js";
import { describe, expect, it } from "vitest";

const logs: LogEntry[] = [
  new LogEntry({
    level: LogLevel.INFO,
    message: "Log 2",
    requestId: "2",
    service: "ORDER",
    timestamp: new Date(1765210356352),
  }),
  new LogEntry({
    level: LogLevel.INFO,
    message: "Log 1",
    requestId: "1",
    service: "PAYMENT",
    timestamp: new Date(1765210345145),
  }),
  new LogEntry({
    level: LogLevel.ERROR,
    message: "Log 3",
    requestId: "3",
    service: "ORDER",
    timestamp: new Date(1765210356352),
  }),
];

describe("compare log entries", () => {
  const sortedLogs = logs.toSorted((a, b) => a.compare(b));

  it("should compare log entries correctly(Different timestamp)", () => {
    expect(sortedLogs[0].requestId).toBe("1");
  });

  it("should compare log entries correctly(Same timestamp)", () => {
    expect(sortedLogs[1].requestId).toBe("3");
  });
});
