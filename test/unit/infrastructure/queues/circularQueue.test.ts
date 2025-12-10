import { LogEntry } from "#domain/log/LogEntry.js";
import { LogLevel } from "#domain/log/LogLevel.js";
import {
  CircularQueue,
  ENQUEUE_EVENT,
  QueueEmptyError,
  QueueFullError,
} from "#infrastructure/queues/CircularQueue.js";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("Circular Queue", () => {
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

  const queue = new CircularQueue<LogEntry>(10);

  afterEach(() => {
    queue.removeAllListeners();
  });

  it("should enqueue an item if not empty", () => {
    const ok = queue.enqueue(logs[0]);

    expect(ok).toBe("OK");
  });

  it("should dequeue and return the item", () => {
    const log = queue.dequeue();

    expect(log.requestId).toBe(logs[0].requestId);
  });

  it("should throw error if dequeue is performed on empty queue", () => {
    const log = queue.dequeue();

    expect(log).toBeNull();
  });

  it("should return correct queue size", () => {
    const cq = new CircularQueue<LogEntry>(2);

    for (let i = 0; i <= 1; i++) cq.enqueue(logs[i]);

    expect(cq.size()).toBe(2);

    // Remove one item
    cq.dequeue();
    expect(cq.size()).toBe(1);

    cq.enqueue(logs[2]);
    expect(cq.size()).toBe(2);
  });

  it("should throw error if enqueue is performed on full queue", () => {
    const cq = new CircularQueue<LogEntry>(2);

    // Put 2 logs
    for (let i = 0; i <= 1; i++) cq.enqueue(logs[i]);

    // Adding more logs should throw error
    expect(() => cq.enqueue(logs[2])).toThrow(QueueFullError);
  });

  it("should emit an event when an item is enqueued", () => {
    const handler = vi.fn();

    queue.on(ENQUEUE_EVENT, handler);

    queue.enqueue(logs[0]);

    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(logs[0]);
  });
});
