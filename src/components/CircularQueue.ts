import { Ref, ref } from 'vue';

interface CircularQueueOptions {
  interval?: number;
  startIndex?: number;
  immediate?: boolean;
}

interface ICircularQueue<T> {
  timer: number | undefined;
  queue: T[];
  interval: number;
  currentIndex: Ref<number>;
  getCurrentIndex: () => number;
  getCurrentItem: () => T;
  to: (index: number) => void;
  previous: () => void;
  next: () => void;
  start: () => void;
  stop: () => void;
}

class CircularQueue<T> implements ICircularQueue<T> {
  timer: number | undefined;
  queue: T[];
  interval: number;
  currentIndex: Ref<number>;
  constructor(queue: T[], options?: CircularQueueOptions) {
    this.queue = queue;
    this.interval = options?.interval || 3000;
    this.currentIndex = ref(options?.startIndex || 0);
    let immediate = options?.immediate || true;
    if (immediate) this.start();
  }
  getCurrentIndex(): number {
    return this.currentIndex.value;
  }
  getCurrentItem(): T {
    return this.queue[this.currentIndex.value];
  }
  to(index: number): void {
    this.currentIndex.value = index;
  }
  previous(): void {
    this.to((this.queue.length + this.currentIndex.value - 1) % this.queue.length);
  }
  next(): void {
    this.to((this.currentIndex.value + 1) % this.queue.length);
  }
  start(): void {
    this.stop();
    this.timer = setInterval(() => this.next(), this.interval);
  }
  stop(): void {
    clearInterval(this.timer);
  }
  setInteral(interval: number): void {
    this.interval = interval;
    if (this.timer) {
      this.stop();
      this.start();
    }
  }
}

export default CircularQueue;
