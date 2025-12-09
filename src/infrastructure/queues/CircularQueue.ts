import EventEmitter from "node:events";

// const DEQUEUE_EVENT = "dequeue";
const ENQUEUE_EVENT = "enqueue";

export class CircularQueue<T> extends EventEmitter {
  private currentSize: number;
  private head: number;
  private maxSize: number;
  private queue: T[];
  private tail: number;

  constructor(maxSize = 10000) {
    super();
    this.maxSize = maxSize;
    this.head = 0;
    this.tail = 0;
    this.currentSize = 0;
    this.queue = new Array<T>(maxSize);
  }

  /**
   *  Throws QueueEmptyError if queue is empty
   *
   * @returns T
   */
  dequeue(): T {
    // early return if empty
    if (this.currentSize === 0 || this.head === this.tail)
      throw new QueueEmptyError();

    // Item is at tail
    const item = this.queue[this.head];

    // move head ahead(or wrap if maxSize reached)
    this.head = (this.head + 1) % this.maxSize;
    this.currentSize--;

    return item;
  }

  /**
   * Enqueue an item into queue
   *
   * Throws QueueFullError if Queue is alreay full
   * @returns void
   */
  enqueue(item: T): void {
    // throw error if queue is full
    if (this.currentSize === this.maxSize)
      throw new QueueFullError(this.currentSize);

    this.queue[this.tail] = item;

    // Move the tail to next empty spot
    this.tail = (this.tail + 1) % this.maxSize;
    this.currentSize++;

    // Fire an enqueue event
    this.emit(ENQUEUE_EVENT, item);
  }
}

export class QueueEmptyError extends Error {
  constructor() {
    super("queue is empty");
  }
}

export class QueueFullError extends Error {
  constructor(size: number) {
    super(`queue is full: ${String(size)}`);
  }
}
